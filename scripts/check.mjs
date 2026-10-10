import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
for(const f of readdirSync(path.join(root,'dist')).filter(f=>f.endsWith('.mjs')))execFileSync(process.execPath,['--check',path.join(root,'dist',f)]);
const html=readFileSync(path.join(root,'dist/index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
if(new Set(ids).size!==ids.length)throw new Error('Duplicate static HTML id');
const app=readFileSync(path.join(root,'dist/app.mjs'),'utf8');
const dynamicIds=['look-name','form-status','share-url','copy-status'];
for(const id of [...app.matchAll(/\$\('([^']+)'\)/g)].map(x=>x[1]))if(!ids.includes(id)&&!dynamicIds.includes(id))throw new Error('Missing DOM element: '+id);
for(const file of ['index.html','architecture.html']){
 const content=readFileSync(path.join(root,'dist',file),'utf8');
 for(const m of content.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g))if(!existsSync(path.join(root,'dist',m[1])))throw new Error('Missing linked file: '+m[1]);
}
const all=readFileSync(path.join(root,'dist/styles.css'),'utf8');if(!all.includes('@media(max-width:580px)'))throw new Error('Missing mobile styles');
if(readFileSync(path.join(root,'docs/ARCHITECTURE.md'),'utf8')!==readFileSync(path.join(root,'dist/architecture.md'),'utf8'))throw new Error('Architecture source and downloadable copy differ');
console.log('PASS: JavaScript syntax, static DOM contracts, local asset links, responsive stylesheet, architecture copy.');
