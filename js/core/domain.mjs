import {COLORS,BOTTOMS,GARMENTS,OCCASIONS,STYLES,ACCESSORIES,AVATARS,BACKDROPS,DEFAULT_CONFIG,byId} from '../data/catalog.mjs';
export const MAX_LOOKS=50;
const fields={garment:GARMENTS,occasion:OCCASIONS,style:STYLES,color:COLORS,bottom:BOTTOMS,avatar:AVATARS,backdrop:BACKDROPS};
export function cloneConfig(c=DEFAULT_CONFIG){return {...c,accessories:[...c.accessories]};}
export function validConfig(c){
 if(!c||typeof c!=='object'||Array.isArray(c)||Object.keys(c).length!==8) return false;
 if(!Object.entries(fields).every(([key,items])=>typeof c[key]==='string'&&!!byId(items,c[key]))) return false;
 if(!Array.isArray(c.accessories)||c.accessories.length>2||new Set(c.accessories).size!==c.accessories.length) return false;
 const found=c.accessories.map(id=>byId(ACCESSORIES,id));
 return found.every(Boolean)&&new Set(found.map(a=>a.group)).size===found.length;
}
export function updateConfig(c,key,value){
 if(key==='accessories') throw new Error('Use toggleAccessory');
 const next={...cloneConfig(c),[key]:value};
 if(!validConfig(next)) throw new Error('Lựa chọn không hợp lệ.');
 return next;
}
export function toggleAccessory(c,id){
 const item=byId(ACCESSORIES,id); if(!item)throw new Error('Phụ kiện không hợp lệ.');
 const selected=c.accessories.includes(id);
 const next=cloneConfig(c);
 next.accessories=next.accessories.filter(a=>a!==id&&(!selected?byId(ACCESSORIES,a).group!==item.group:true));
 if(!selected)next.accessories.push(id);
 return next;
}
export function recommend(c){
 const map={tet:{color:'do-gach',style:'thanh-lich',accessories:['non-la','quat']},'ky-yeu':{color:'trang-nga',style:'thanh-lich',accessories:['non-la']},'le-hoi':{color:'vang-mo',style:'truyen-thong',accessories:['khan-van','quat']},'dao-pho':{color:'hong-sen',style:'pha-cach',accessories:['tui-may']},'di-san':{color:'xanh-cham',style:'truyen-thong',accessories:['khan-van']}};
 const next={...cloneConfig(c),...map[c.occasion],bottom:'trang-nga'};
 if(c.garment==='tu-than'&&c.occasion==='le-hoi'){next.color='xanh-reu';next.bottom='nau-dat';}
 return next;
}
export function describe(c){
 const garment=byId(GARMENTS,c.garment), color=byId(COLORS,c.color),bottom=byId(BOTTOMS,c.bottom);
 const notes={tet:'Một sắc áo ấm và một điểm nhấn nhẹ để đón những ngày đầu năm.','ky-yeu':'Giữ phụ kiện gọn để gương mặt và tập thể nổi bật trong khung hình.','le-hoi':'Các lớp màu tạo nhịp vui cho ngày hội. Hãy xem thêm yêu cầu của sự kiện.','dao-pho':'Một bản phối thoải mái cho cuộc hẹn cuối tuần, thêm phụ kiện vừa đủ.','di-san':'Sắc trầm tạo tổng thể nhẹ nhàng. Hãy tuân theo hướng dẫn trang phục của điểm tham quan.'};
 const warning=c.style==='pha-cach'?'Đây là gợi ý phối đương đại. Không dùng mockup này để đại diện một mẫu phục dựng lịch sử.':garment.care;
 const harmony=c.bottom==='trang-nga'?(c.color==='trang-nga'?'Đồng điệu sắc ngà':'Nền sáng, áo làm điểm nhấn'):(c.color==='trang-nga'||c.color==='vang-mo'?'Sáng – trầm cân bằng':'Một tổng thể trầm ấm');
 return {garment,color,bottom,occasion:byId(OCCASIONS,c.occasion),style:byId(STYLES,c.style),accessories:c.accessories.map(id=>byId(ACCESSORIES,id)),note:notes[c.occasion],warning,harmony};
}
export function encodeConfig(c){if(!validConfig(c))throw new Error('Bản phối không hợp lệ.');return btoa(JSON.stringify({v:1,c})).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
export function decodeConfig(encoded){
 if(typeof encoded!=='string'||encoded.length>2048||!/^[A-Za-z0-9_-]+$/.test(encoded))throw new Error('Liên kết bản phối không hợp lệ.');
 try{const p=JSON.parse(atob(encoded.replace(/-/g,'+').replace(/_/g,'/')));if(p.v!==1||!validConfig(p.c))throw 0;return cloneConfig(p.c);}catch{throw new Error('Liên kết bản phối không hợp lệ hoặc dùng phiên bản chưa hỗ trợ.');}
}
export function validLook(l){return !!l&&typeof l==='object'&&typeof l.id==='string'&&/^[a-zA-Z0-9_-]{8,80}$/.test(l.id)&&typeof l.name==='string'&&l.name.trim().length>0&&l.name.length<=60&&typeof l.createdAt==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(l.createdAt)&&Number.isFinite(Date.parse(l.createdAt))&&validConfig(l.config);}
export function parseBackup(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>1048576)throw new Error('Tệp sao lưu phải nhỏ hơn 1 MB.');
 let data;try{data=JSON.parse(text);}catch{throw new Error('Không đọc được JSON. Hãy chọn tệp sao lưu của Nếp Việt.');}
 if(data?.app!=='nep-viet'||data.version!==1||!Array.isArray(data.looks))throw new Error('Tệp không phải bản sao lưu Nếp Việt phiên bản 1.');
 if(data.looks.length>MAX_LOOKS||!data.looks.every(validLook)||new Set(data.looks.map(l=>l.id)).size!==data.looks.length)throw new Error('Bản sao lưu chứa dữ liệu không hợp lệ hoặc quá 50 bản phối.');
 return data.looks.map(l=>({id:l.id,name:l.name.trim(),createdAt:l.createdAt,config:cloneConfig(l.config)}));
}
export function makeBackup(looks){return JSON.stringify({app:'nep-viet',version:1,exportedAt:new Date().toISOString(),looks},null,2);}
export function cleanName(name){return String(name??'').trim().slice(0,60);}
export function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
