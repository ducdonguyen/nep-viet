import {about,closeDialog,compareDialog,findLook,openDialog,saveDialog,shareDialog,story} from './components/dialogs.mjs';
import {icon} from './components/icons.mjs';
import {outfitSVG} from './components/mannequin.mjs';
import {$,count,downloadFile,toast} from './components/ui.mjs';
import {MAX_LOOKS,cleanName,cloneConfig,decodeConfig,escapeHtml as esc,makeBackup,parseBackup,recommend,toggleAccessory,updateConfig} from './core/domain.mjs';
import {setView} from './core/router.mjs';
import {S,initialMessages,repo} from './core/state.mjs';
import {ACCESSORIES,DEFAULT_CONFIG,GARMENTS,OCCASIONS,PRESETS,byId} from './data/catalog.mjs';
import {renderCollection} from './pages/collection.mjs';
import {renderExplore} from './pages/explore.mjs';
import {applyConfig,renderPresets,renderStudio} from './pages/studio.mjs';

/* Điểm khởi động: dựng giao diện ban đầu và nối các sự kiện. */
$('occasion').innerHTML=OCCASIONS.map(o=>`<option value="${o.id}">${o.name}</option>`).join('');
$('reset-button').innerHTML=icon('reset')+' Bắt đầu lại';$('suggest-button').innerHTML=icon('spark')+' Gợi ý theo dịp này';
$('save-button').innerHTML=icon('bookmark')+' Lưu bản phối';$('download-button').innerHTML=icon('download')+' Tải hình';
$('share-button').innerHTML=icon('share');$('story-icon').innerHTML=icon('book');$('story-more').innerHTML='Đọc câu chuyện & nguồn '+icon('arrow');
$('culture-icon').innerHTML=icon('info');$('modal-close').innerHTML=icon('close');
$('backup-button').innerHTML=icon('download')+' Tải sao lưu';$('import-button').innerHTML=icon('upload')+' Nhập sao lưu';
renderStudio();renderPresets();count();

document.addEventListener('click',async event=>{
 const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
 const {action}=button.dataset;
 try{
  switch(action){
   case 'view':setView(button.dataset.view);break;
   case 'set':{const {field,value}=button.dataset;applyConfig(updateConfig(S.config,field,value));document.querySelector(`[data-action="set"][data-field="${field}"][data-value="${value}"]`)?.focus({preventScroll:true});break;}
   case 'accessory':{const id=button.dataset.value;const item=byId(ACCESSORIES,id);const replaced=S.config.accessories.find(a=>a!==id&&byId(ACCESSORIES,a).group===item.group);applyConfig(toggleAccessory(S.config,id),replaced?`${item.name} đã thay ${byId(ACCESSORIES,replaced).name.toLowerCase()}.`:null);document.querySelector(`[data-action="accessory"][data-value="${id}"]`)?.focus({preventScroll:true});break;}
   case 'suggest':applyConfig(recommend(S.config),'Đã gợi ý màu và phụ kiện theo dịp. Bạn có thể điều chỉnh tiếp.');break;
   case 'reset':openDialog('Bắt đầu một bản phối mới?',`<p>Bản nháp hiện tại sẽ trở về mẫu ban đầu. Những bản đã lưu vẫn nằm trong bộ sưu tập.</p><div class="dialog-actions"><button class="outline-button" data-action="close">Giữ bản đang phối</button><button class="primary-button" data-action="reset-confirm">Bắt đầu lại</button></div>`);break;
   case 'reset-confirm':applyConfig(DEFAULT_CONFIG);closeDialog();history.replaceState(null,'',location.pathname+location.search);toast('Đã mở lại bản phối ban đầu.');break;
   case 'preset':{const p=byId(PRESETS,button.dataset.id);if(p){applyConfig(p.config,`Đã chọn “${p.title}”. Hãy thêm chất riêng của bạn.`);setView('studio');}break;}
   case 'use-garment':{const g=byId(GARMENTS,button.dataset.id);if(g){applyConfig({...S.config,garment:g.id,color:g.defaultColor});if($('modal').open)closeDialog();setView('studio');}break;}
   case 'story':story(button.dataset.id||S.config.garment);break;
   case 'region':S.region=button.dataset.id;renderExplore();document.querySelector(`[data-action="region"][data-id="${S.region}"]`)?.focus();break;
   case 'save':saveDialog();break;
   case 'rename':saveDialog(button.dataset.id);break;
   case 'download':downloadFile(outfitSVG(S.config,{exported:true}),'image/svg+xml;charset=utf-8',`nep-viet-${S.config.garment}-${S.config.color}.svg`);toast('Đã tạo hình SVG để tải về.');break;
   case 'share':shareDialog();break;
   case 'copy':try{await navigator.clipboard.writeText($('share-url').value);$('copy-status').textContent='Đã sao chép liên kết.';}catch{$('share-url').focus();$('share-url').select();$('copy-status').textContent='Hãy nhấn Ctrl+C hoặc ⌘C để sao chép liên kết đã chọn.';}break;
   case 'close':closeDialog();break;
   case 'open-look':{const look=findLook(button.dataset.id);applyConfig(look.config,`Đã mở “${look.name}”. Lưu sẽ tạo một bản mới.`);if($('modal').open)closeDialog();setView('studio');break;}
   case 'delete':{const l=findLook(button.dataset.id);S.modalLookId=l.id;openDialog('Xóa bản phối này?',`<p>“${esc(l.name)}” sẽ được xóa khỏi bộ sưu tập trên trình duyệt này. Bạn có thể tải bản sao lưu trước khi xóa.</p><div class="dialog-actions"><button class="outline-button" data-action="close">Giữ lại</button><button class="primary-button" data-action="delete-confirm">${icon('trash')} Xóa bản phối</button></div>`);break;}
   case 'delete-confirm':S.looks=repo.remove(S.modalLookId);S.selected.delete(S.modalLookId);closeDialog();renderCollection();toast('Đã xóa bản phối.');break;
   case 'select-compare':{const id=button.dataset.id;if(S.selected.has(id))S.selected.delete(id);else if(S.selected.size<2)S.selected.add(id);else {toast('Bạn đã chọn hai bản. Bỏ chọn một bản để đổi.');break;}renderCollection();document.querySelector(`[data-action="select-compare"][data-id="${id}"]`)?.focus({preventScroll:true});break;}
   case 'clear-compare':S.selected.clear();renderCollection();break;
   case 'compare':compareDialog();break;
   case 'backup':S.looks=repo.read();downloadFile(makeBackup(S.looks),'application/json;charset=utf-8',`nep-viet-bo-suu-tap-${new Date().toISOString().slice(0,10)}.json`);toast('Đã tạo tệp sao lưu bộ sưu tập.');break;
   case 'import':$('import-file').click();break;
   case 'import-confirm':{const r=repo.import(S.pendingImport);S.looks=r.looks;closeDialog();renderCollection();toast(r.added?`Đã thêm ${r.added} bản phối vào bộ sưu tập.`:'Các bản phối này đã có trong bộ sưu tập.');break;}
   case 'about':about();break;
  }
 }catch(e){toast(e.message||'Có lỗi xảy ra. Vui lòng thử lại.',true);}
});
$('occasion').addEventListener('change',event=>applyConfig(updateConfig(S.config,'occasion',event.target.value)));
document.addEventListener('submit',event=>{
 if(event.target.id!=='look-form')return;event.preventDefault();
 const name=cleanName($('look-name').value);if(!name){$('form-status').textContent='Hãy đặt tên cho bản phối.';$('look-name').focus();return;}
 try{if(S.modalMode==='rename')S.looks=repo.rename(S.modalLookId,name);else S.looks=repo.add({id:crypto.randomUUID(),name,createdAt:new Date().toISOString(),config:cloneConfig(S.config)});closeDialog();count();if(S.view==='collection')renderCollection();toast('Đã lưu vào bộ sưu tập của bạn.');}catch(e){$('form-status').textContent=e.message;}
});
$('import-file').addEventListener('change',async event=>{
 const file=event.target.files[0];if(!file)return;
 try{if(file.size>1048576)throw new Error('Tệp sao lưu phải nhỏ hơn 1 MB.');S.pendingImport=parseBackup(await file.text());const current=repo.read();const fresh=S.pendingImport.filter(l=>!current.some(old=>old.id===l.id));if(current.length+fresh.length>MAX_LOOKS)throw new Error('Không đủ chỗ: tổng số bản phối sau nhập vượt quá 50. Hãy sao lưu và xóa bớt trước.');openDialog('Nhập bộ sưu tập',`<p>Tìm thấy <strong>${S.pendingImport.length}</strong> bản phối hợp lệ. Có <strong>${fresh.length}</strong> bản mới sẽ được thêm; ${S.pendingImport.length-fresh.length} bản trùng ID sẽ được bỏ qua. Các bản đang có được giữ nguyên.</p><div class="dialog-actions"><button class="outline-button" data-action="close">Để sau</button><button class="primary-button" data-action="import-confirm">${icon('upload')} Nhập bộ sưu tập</button></div>`);}catch(e){toast(e.message,true);}finally{event.target.value='';}
});
$('modal').addEventListener('click',event=>{if(event.target===$('modal')){const r=$('modal').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
$('modal').addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
window.addEventListener('storage',event=>{if(event.key==='nep-viet:looks:v1'){try{S.looks=repo.read();count();if(S.view==='collection')renderCollection();}catch(e){toast(e.message,true);}}});
window.addEventListener('hashchange',()=>{try{const p=new URLSearchParams(location.hash.slice(1)).get('p');if(p){applyConfig(decodeConfig(p),'Đã mở bản phối từ liên kết.');setView('studio');}}catch(e){toast(e.message,true);}});
if(initialMessages.length)toast(initialMessages.join(' '),initialMessages.some(m=>!m.startsWith('Đã mở')));
