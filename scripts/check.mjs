import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const rel=p=>path.relative(root,p).split(path.sep).join('/');
const read=p=>readFileSync(p,'utf8');
const walk=(dir,ext)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name),ext):e.name.endsWith(ext)?[path.join(dir,e.name)]:[]);

// 1. Cú pháp mọi module JavaScript trong js/
const modules=walk(path.join(root,'js'),'.mjs');
if(!modules.length)throw new Error('No JavaScript modules found in js/');
for(const f of modules)execFileSync(process.execPath,['--check',f]);

// 2. Mọi import tương đối phải trỏ tới file có thật
for(const f of modules)for(const m of read(f).matchAll(/from\s+'(\.[^']+)'/g))
  if(!existsSync(path.resolve(path.dirname(f),m[1])))throw new Error(`Broken import in ${rel(f)}: ${m[1]}`);

// 3. HTML tĩnh: id không trùng; mọi $('id') trong js/ đều có phần tử tương ứng
const html=read(path.join(root,'index.html'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
if(new Set(ids).size!==ids.length)throw new Error('Duplicate static HTML id');
const dynamicIds=['look-name','form-status','share-url','copy-status'];
for(const f of modules)for(const id of [...read(f).matchAll(/\$\('([^']+)'\)/g)].map(x=>x[1]))
  if(!ids.includes(id)&&!dynamicIds.includes(id))throw new Error(`Missing DOM element: ${id} (used in ${rel(f)})`);

// 4. Liên kết tệp cục bộ trong index.html và docs/architecture.html (tính theo thư mục của chính trang đó)
for(const file of ['index.html','docs/architecture.html']){
  const full=path.join(root,file),content=read(full);
  for(const m of content.matchAll(/(?:src|href)="(\.{1,2}\/[^"#?]+)"/g))
    if(!existsSync(path.resolve(path.dirname(full),m[1])))throw new Error(`Missing linked file in ${file}: ${m[1]}`);
}

// 5. CSS responsive và các tệp CSS được nạp
const css=walk(path.join(root,'css'),'.css').map(read).join('\n');
if(!css.includes('@media(max-width:580px)'))throw new Error('Missing mobile styles');

// 6. Tài liệu kiến trúc: một nguồn duy nhất, và phải nhắc đủ các module hiện có
const arch=path.join(root,'docs/architecture.md');
if(!existsSync(arch))throw new Error('Missing docs/architecture.md');
const archText=read(arch);
for(const f of modules)if(!archText.includes(rel(f)))throw new Error(`docs/architecture.md does not mention ${rel(f)}`);

console.log(`PASS: ${modules.length} JavaScript modules (syntax, imports), static DOM contracts, local asset links, responsive stylesheet, architecture doc coverage.`);
