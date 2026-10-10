import {cloneConfig,decodeConfig} from './domain.mjs';
import {createRepository} from './storage.mjs';

/* Trạng thái dùng chung của phiên làm việc. Mọi trang đọc/ghi qua đối tượng S. */
let storage;try{storage=window.localStorage;}catch{storage={getItem(){throw new Error();},setItem(){throw new Error();}};}
export const repo=createRepository(storage);
export const S={config:cloneConfig(),looks:[],view:'studio',region:'all',selected:new Set(),toastTimer:undefined,modalMode:'',modalLookId:'',pendingImport:[],draftErrorShown:false,lastDialogFocus:undefined};
export const initialMessages=[];
try{S.looks=repo.read();}catch(e){initialMessages.push(e.message);}
try{const shared=new URLSearchParams(location.hash.slice(1)).get('p');S.config=shared?decodeConfig(shared):(repo.loadDraft()||S.config);if(shared)initialMessages.push('Đã mở bản phối từ liên kết. Bạn có thể chỉnh sửa và lưu vào bộ sưu tập.');}catch(e){initialMessages.push(e.message);}
