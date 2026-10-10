import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_CONFIG,GARMENTS,COLORS,PRESETS,OCCASIONS,ACCESSORIES} from '../js/data/catalog.mjs';
import {cloneConfig,validConfig,updateConfig,toggleAccessory,recommend,describe,encodeConfig,decodeConfig,parseBackup,makeBackup,escapeHtml} from '../js/core/domain.mjs';
import {createRepository} from '../js/core/storage.mjs';
import {outfitSVG} from '../js/components/mannequin.mjs';

const newLook=(i=0)=>({id:`look-id-${i}`,name:`Bản phối ${i}`,createdAt:'2026-10-08T00:00:00.000Z',config:cloneConfig()});
function memoryStorage(){const map=new Map();return {map,getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};}

test('Tất cả mẫu và mọi lựa chọn áo/màu đều có cấu hình hợp lệ, nguồn và hình',()=>{
 for(const p of PRESETS)assert.ok(validConfig(p.config));
 for(const g of GARMENTS)for(const color of COLORS){const c={...cloneConfig(),garment:g.id,color:color.id};assert.ok(validConfig(c));assert.equal(describe(c).garment.id,g.id);assert.match(g.source.url,/^https:\/\//);const svg=outfitSVG(c,{exported:true});assert.ok(svg.includes(color.hex));assert.ok(svg.includes(g.name));assert.ok(!/<script|onload=|href="https?:/i.test(svg));}
});
test('Phụ kiện cùng nhóm thay thế nhau và chọn lại sẽ bỏ chọn',()=>{
 let c=toggleAccessory(cloneConfig(),'khan-van');assert.deepEqual(c.accessories,['quat','khan-van']);
 c=toggleAccessory(c,'tui-may');assert.deepEqual(c.accessories,['khan-van','tui-may']);
 c=toggleAccessory(c,'khan-van');assert.deepEqual(c.accessories,['tui-may']);assert.ok(validConfig(c));
 assert.deepEqual(DEFAULT_CONFIG.accessories,['non-la','quat']);
});
test('Gợi ý theo dịp giữ nguyên loại áo và tạo cấu hình hợp lệ',()=>{
 for(const g of GARMENTS)for(const occasion of OCCASIONS){const c={...cloneConfig(),garment:g.id,occasion:occasion.id};const next=recommend(c);assert.equal(next.garment,g.id);assert.equal(next.occasion,occasion.id);assert.ok(validConfig(next));assert.ok(describe(next).note.length>20);}
 assert.notEqual(recommend({...cloneConfig(),occasion:'tet'}).color,recommend({...cloneConfig(),occasion:'ky-yeu'}).color);
});
test('Trạng thái và SVG không nhận màu hoặc dữ liệu lạ',()=>{
 const invalid=[null,{},[],{...cloneConfig(),color:'url(javascript:alert(1))'},{...cloneConfig(),foo:1},{...cloneConfig(),accessories:['non-la','khan-van']},{...cloneConfig(),accessories:['quat','quat']},{...cloneConfig(),accessories:['tui-la']}];
 for(const c of invalid){assert.equal(validConfig(c),false);assert.throws(()=>outfitSVG(c));}
 assert.throws(()=>updateConfig(cloneConfig(),'color','unknown'));
});
test('Liên kết chia sẻ khứ hồi giữ đúng các lựa chọn và từ chối liên kết hỏng',()=>{
 for(const p of PRESETS)assert.deepEqual(decodeConfig(encodeConfig(p.config)),p.config);
 assert.throws(()=>decodeConfig('a'.repeat(3000)));assert.throws(()=>decodeConfig('not valid'));assert.throws(()=>decodeConfig(btoa('{"v":2,"c":{}}')));
});
test('Lưu, mở, đổi tên và xóa hoạt động qua các lần tạo repository',()=>{
 const storage=memoryStorage(),one=createRepository(storage);const original=newLook();
 one.add(original);const two=createRepository(storage);assert.deepEqual(two.read(),[original]);
 two.rename(original.id,'Du xuân của mình');assert.equal(one.read()[0].name,'Du xuân của mình');
 two.remove(original.id);assert.equal(one.read().length,0);assert.throws(()=>two.rename(original.id,'Tên mới'));
});
test('Bản đã lưu là snapshot độc lập với bản nháp',()=>{
 const repository=createRepository(memoryStorage()),look=newLook();repository.add(look);look.config.color='xanh-reu';look.name='Sửa ngoài';assert.equal(repository.read()[0].config.color,'do-gach');assert.equal(repository.read()[0].name,'Bản phối 0');
});
test('Lưu lỗi quota phải báo lỗi; dữ liệu cũ giữ nguyên',()=>{
 const storage=memoryStorage();const repository=createRepository(storage);repository.add(newLook());storage.setItem=()=>{throw new Error('quota');};assert.throws(()=>repository.add(newLook(1)),/Chưa lưu được/);assert.equal(repository.read().length,1);assert.throws(()=>repository.saveDraft(cloneConfig()),/chưa được lưu/);
});
test('Dữ liệu lưu hỏng được giữ nguyên và không bị ghi đè',()=>{
 const storage=memoryStorage();storage.map.set('nep-viet:looks:v1','{broken');const repository=createRepository(storage);assert.throws(()=>repository.read(),/dữ liệu lỗi/);assert.throws(()=>repository.add(newLook()));assert.equal(storage.map.get('nep-viet:looks:v1'),'{broken');
});
test('Không vượt 50 bản, ID trùng không được ghi',()=>{
 const repository=createRepository(memoryStorage());for(let i=0;i<50;i++)repository.add(newLook(i));assert.throws(()=>repository.add(newLook(51)),/50/);assert.throws(()=>repository.add(newLook(1)),/đã tồn tại/);assert.equal(repository.read().length,50);
});
test('Sao lưu và nhập khứ hồi; nhập hợp nhất không xóa, không nhân bản ID',()=>{
 const input=[newLook(),newLook(1)];const parsed=parseBackup(makeBackup(input));assert.deepEqual(parsed,input);
 const repository=createRepository(memoryStorage());repository.add(newLook(2));assert.equal(repository.import(parsed).added,2);assert.equal(repository.import(parsed).added,0);assert.equal(repository.read().length,3);assert.throws(()=>repository.import([newLook(3),newLook(3)]));assert.equal(repository.read().length,3);
});
test('Từ chối JSON lớn, sai phiên bản, ngày sai, tên sai, ID nguy hiểm và cấu hình sai',()=>{
 for(const text of ['x'.repeat(1048577),'not json','{"app":"other","version":1,"looks":[]}',JSON.stringify({app:'nep-viet',version:2,looks:[]})])assert.throws(()=>parseBackup(text));
 for(const change of [{id:'<script>'},{name:''},{name:'x'.repeat(61)},{createdAt:'not a date'},{config:{...cloneConfig(),color:'mau-la'}}])assert.throws(()=>parseBackup(makeBackup([{...newLook(),...change}])));
 assert.throws(()=>parseBackup(makeBackup([newLook(),newLook()])));
});
test('Tên có ký tự HTML chỉ hiển thị dạng văn bản',()=>{
 const raw='<img src=x onerror="bad()"> &\'test\'';const safe=escapeHtml(raw);assert.ok(!safe.includes('<'));assert.ok(safe.includes('&quot;'));assert.ok(safe.includes('&amp;'));assert.ok(safe.includes('&#39;'));
});
test('Mỗi SVG có định danh riêng khi xuất cạnh nhau',()=>{
 const a=outfitSVG(cloneConfig()),b=outfitSVG(cloneConfig());const ids=markup=>[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.ok(ids(a).length>2);assert.ok(ids(a).every(id=>!ids(b).includes(id)));
});
test('Nhắc văn hóa thay đổi theo trang phục và cách phối',()=>{
 assert.match(describe({...cloneConfig(),garment:'ngu-than'}).warning,/năm thân/);
 assert.match(describe({...cloneConfig(),style:'pha-cach'}).warning,/đương đại/);
 assert.notEqual(describe(cloneConfig()).harmony,describe({...cloneConfig(),color:'trang-nga'}).harmony);
});
