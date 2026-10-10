import {icon} from './icons.mjs';
import {outfitSVG} from './mannequin.mjs';
import {$} from './ui.mjs';
import {describe,encodeConfig,escapeHtml as esc} from '../core/domain.mjs';
import {S} from '../core/state.mjs';
import {GARMENTS,PRESETS,byId} from '../data/catalog.mjs';

/* Hộp thoại: chuyện tà áo, lưu/đổi tên, so sánh, chia sẻ, giới thiệu. */
export function openDialog(title,content,wide=false){
 const dialog=$('modal');S.lastDialogFocus=document.activeElement;$('modal-title').textContent=title;$('modal-content').innerHTML=content;dialog.classList.toggle('compare-dialog',wide);if(!dialog.open)dialog.showModal();
 const input=dialog.querySelector('input:not([readonly])');if(input){input.focus();input.select();}
}
export function closeDialog(){ $('modal').close();S.modalMode='';S.pendingImport=[];if(S.lastDialogFocus?.isConnected)S.lastDialogFocus.focus(); }
export function story(id=S.config.garment){
 const g=byId(GARMENTS,id);if(!g)return;
 const c=g.id===S.config.garment?S.config:PRESETS.find(p=>p.config.garment===g.id).config;
 openDialog(g.name+' · Chuyện của tà áo',`<div class="modal-story-layout">${outfitSVG(c)}<div><p class="dialog-subtitle">${g.regionLabel.toUpperCase()}</p><p>${g.story}</p><p>${g.detail}</p></div></div><div class="feature-tags">${g.features.map(f=>`<span>${f}</span>`).join('')}</div><p><strong>Gợi ý khi mặc:</strong> ${g.care}</p><div class="source-box"><a href="${g.source.url}" target="_blank" rel="noopener noreferrer">${g.source.publisher} — ${g.source.title} ${icon('external')}</a><small>${g.source.kind} · Tra cứu ngày 08/10/2026.</small><small>Nội dung tổng hợp chưa được chuyên gia cổ phục thẩm định. Hình chỉ minh họa ý tưởng phối, không phải phục dựng lịch sử.</small></div><div class="dialog-actions"><button class="primary-button" data-action="use-garment" data-id="${g.id}">Phối cùng ${g.name.toLowerCase()} ${icon('arrow')}</button></div>`);
}
export function saveDialog(renameId){
 S.modalMode=renameId?'rename':'save';S.modalLookId=renameId||'';
 const look=renameId?S.looks.find(l=>l.id===renameId):null;if(renameId&&!look)return;
 const c=look?look.config:S.config,d=describe(c),name=look?.name||`${d.garment.name} ${d.color.name.toLowerCase()}`;
 openDialog(look?'Đổi tên bản phối':'Cất một nếp áo đẹp',`<div class="dialog-mini">${outfitSVG(c)}<div><strong>${d.garment.name}</strong><small>${d.color.name} · ${d.style.name}</small></div></div><form id="look-form" class="dialog-form"><label for="look-name">Đặt tên cho bản phối</label><input id="look-name" name="lookName" type="text" value="${esc(name)}" required maxlength="60" autocomplete="off"><div class="dialog-status" id="form-status" role="alert"></div><p>Bản phối được lưu trên trình duyệt này. Bạn có thể tải bản sao lưu trong Bộ sưu tập.</p><div class="dialog-actions"><button type="button" class="outline-button" data-action="close">Để sau</button><button type="submit" class="primary-button">${icon('bookmark')} ${look?'Lưu tên mới':'Lưu bản phối'}</button></div></form>`);
}
export function findLook(id){const l=S.looks.find(l=>l.id===id);if(!l)throw new Error('Không tìm thấy bản phối. Hãy mở lại bộ sưu tập.');return l;}
export function compareDialog(){
 if(S.selected.size!==2)return;
 const compared=[...S.selected].map(findLook);
 openDialog('Hai cách kể, một nét Việt',`<p>Đặt cạnh nhau để tìm ra bản phối hợp với bạn và dịp sử dụng.</p><div class="compare-grid">${compared.map(l=>{
 const d=describe(l.config);return `<section class="compare-item">${outfitSVG(l.config)}<h3>${esc(l.name)}</h3><dl><div><dt>Trang phục</dt><dd>${d.garment.name}</dd></div><div><dt>Màu sắc</dt><dd>${d.color.name} · ${d.bottom.name}</dd></div><div><dt>Phong cách</dt><dd>${d.style.name}</dd></div><div><dt>Dịp</dt><dd>${d.occasion.name}</dd></div><div><dt>Phụ kiện</dt><dd>${d.accessories.map(a=>a.name).join(', ')||'Không có'}</dd></div></dl><p class="compare-note">${d.warning}</p><button class="primary-button" data-action="open-look" data-id="${l.id}">Chọn bản phối này ${icon('arrow')}</button></section>`;
 }).join('')}</div>`,true);
}
export function shareDialog(){
 const url=new URL(location.href);url.search='';url.hash='p='+encodeConfig(S.config);
 openDialog('Gửi một bản phối, kể một câu chuyện',`<p>Liên kết mang theo trang phục, màu và phụ kiện bạn đang chọn. Người nhận có thể mở và phối tiếp nếu có quyền truy cập ứng dụng.</p><label for="share-url" class="sr-only">Liên kết bản phối</label><input id="share-url" class="share-input" readonly><div class="dialog-status" id="copy-status" role="status"></div><p>Liên kết không chứa tên trong bộ sưu tập. Bạn cũng có thể tải hình SVG để gửi qua ứng dụng mình thường dùng.</p><div class="dialog-actions"><button class="outline-button" data-action="download">${icon('download')} Tải hình SVG</button><button class="primary-button" data-action="copy">${icon('share')} Sao chép liên kết</button></div>`);
 $('share-url').value=url.href;
}
export function about(){openDialog('Nếp Việt · Việt phục Remix',`<p>Một không gian nhỏ để bạn tìm hiểu, thử phối và mang nét Việt vào cuộc sống hôm nay.</p><ul class="note-list"><li><strong>Bản 1.0:</strong> ba nhóm trang phục, phối màu và phụ kiện, hai nhân vật minh họa, lưu bộ sưu tập, so sánh, xuất hình SVG và sao lưu JSON.</li><li><strong>Dữ liệu của bạn:</strong> lưu trên trình duyệt hiện tại; chưa đồng bộ tài khoản. Không thu thập ảnh, email, vị trí hoặc số đo.</li><li><strong>Thông tin văn hóa:</strong> mỗi áo có nguồn tham khảo. Bản đầu chưa qua thẩm định của chuyên gia cổ phục. Gợi ý phối là lựa chọn thiết kế, không phải quy tắc lịch sử.</li><li><strong>Hình minh họa:</strong> dùng để thử ý tưởng màu và phụ kiện, không phải thử đồ trên ảnh thật hoặc bản dựng chính xác cấu trúc may.</li></ul><div class="dialog-actions"><a class="outline-button" href="./architecture.html">Đọc kiến trúc dự án ${icon('arrow')}</a><button class="primary-button" data-action="close">Cùng phối thôi</button></div>`);}
