import {validConfig,validLook,cloneConfig,MAX_LOOKS} from './domain.mjs';
const BOOK_KEY='nep-viet:looks:v1',DRAFT_KEY='nep-viet:draft:v1';
export function createRepository(storage){
 const read=()=>{
  let raw;try{raw=storage.getItem(BOOK_KEY);}catch{throw new Error('Trình duyệt đang chặn lưu trữ. Bạn vẫn có thể phối và tải hình.');}
  if(!raw)return [];
  try{const x=JSON.parse(raw);if(x.version!==1||!Array.isArray(x.looks)||x.looks.length>MAX_LOOKS||!x.looks.every(validLook)||new Set(x.looks.map(l=>l.id)).size!==x.looks.length)throw 0;return x.looks;}catch{throw new Error('Bộ sưu tập trên thiết bị có dữ liệu lỗi. Hãy giữ bản sao dữ liệu trình duyệt trước khi đặt lại.');}
 };
 const write=looks=>{if(looks.length>MAX_LOOKS)throw new Error('Bộ sưu tập đã đạt 50 bản phối. Hãy sao lưu và xóa bớt trước khi thêm.');if(!looks.every(validLook)||new Set(looks.map(l=>l.id)).size!==looks.length)throw new Error('Bộ sưu tập chứa dữ liệu không hợp lệ.');try{storage.setItem(BOOK_KEY,JSON.stringify({version:1,looks}));}catch{throw new Error('Chưa lưu được: trình duyệt chặn lưu trữ hoặc đã hết dung lượng. Hãy tải hình để giữ bản phối.');}return looks;};
 return {
  read,
  add(look){if(!validLook(look))throw new Error('Bản phối không hợp lệ.');const looks=read();if(looks.some(l=>l.id===look.id))throw new Error('Bản phối đã tồn tại.');return write([look,...looks]);},
  rename(id,name){if(!name||name.length>60)throw new Error('Tên phải có từ 1 đến 60 ký tự.');const looks=read();if(!looks.some(l=>l.id===id))throw new Error('Bản phối đã bị xóa ở cửa sổ khác.');return write(looks.map(l=>l.id===id?{...l,name}:l));},
  remove(id){return write(read().filter(l=>l.id!==id));},
  import(looks){if(!Array.isArray(looks)||!looks.every(validLook))throw new Error('Dữ liệu nhập không hợp lệ.');const old=read(),ids=new Set(old.map(l=>l.id));const fresh=looks.filter(l=>!ids.has(l.id));return {looks:write([...fresh,...old]),added:fresh.length};},
  loadDraft(){let raw;try{raw=storage.getItem(DRAFT_KEY);if(!raw)return null;const c=JSON.parse(raw);if(!validConfig(c))throw 0;return cloneConfig(c);}catch{throw new Error('Không khôi phục được bản nháp. Đang mở bản phối mặc định.');}},
  saveDraft(c){if(!validConfig(c))throw new Error('Bản nháp không hợp lệ.');try{storage.setItem(DRAFT_KEY,JSON.stringify(c));}catch{throw new Error('Bản nháp chưa được lưu trên thiết bị. Bạn vẫn có thể tải hình.');}}
 };
}
