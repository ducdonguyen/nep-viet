import {icon} from '../components/icons.mjs';
import {outfitSVG} from '../components/mannequin.mjs';
import {$,count,pressed} from '../components/ui.mjs';
import {MAX_LOOKS,describe,escapeHtml as esc} from '../core/domain.mjs';
import {S} from '../core/state.mjs';

/* Trang Bộ sưu tập. */
export function renderCollection(){
 S.selected=new Set([...S.selected].filter(id=>S.looks.some(l=>l.id===id)));
 $('collection-total').textContent=`${String(S.looks.length).padStart(2,'0')} bản phối · ${MAX_LOOKS} chỗ trong tủ áo`;
 $('backup-button').disabled=!S.looks.length;
 $('collection-grid').innerHTML=S.looks.length?S.looks.map(l=>{
 const d=describe(l.config),chosen=S.selected.has(l.id);
 return `<article class="look-card${chosen?' selected':''}"><button class="look-select" data-action="select-compare" data-id="${l.id}" ${pressed(chosen)} aria-label="${chosen?'Bỏ chọn':'Chọn so sánh'} ${esc(l.name)}">${icon(chosen?'check':'compare')} ${chosen?'Đã chọn':'So sánh'}</button><button class="look-art" data-action="open-look" data-id="${l.id}" aria-label="Mở bản phối ${esc(l.name)}">${outfitSVG(l.config)}</button><div class="look-body"><h3>${esc(l.name)}</h3><p>${d.garment.name} · ${d.color.name}<br>${new Date(l.createdAt).toLocaleDateString('vi-VN')}</p><div class="look-actions"><button class="text-button" data-action="open-look" data-id="${l.id}">Tiếp tục phối ${icon('arrow')}</button><div><button class="icon-button" data-action="rename" data-id="${l.id}" aria-label="Đổi tên ${esc(l.name)}" title="Đổi tên">${icon('edit')}</button><button class="icon-button" data-action="delete" data-id="${l.id}" aria-label="Xóa ${esc(l.name)}" title="Xóa">${icon('trash')}</button></div></div></div></article>`;
 }).join(''):`<div class="empty-state">${icon('bookmark')}<h2>Tủ áo đang chờ bạn.</h2><p>Lưu bản phối đầu tiên để giữ một ý tưởng đẹp. Mỗi lần trở lại, bạn có thể tiếp tục biến tấu.</p><button class="primary-button" data-action="view" data-view="studio">Tạo bản phối đầu tiên ${icon('arrow')}</button></div>`;
 $('compare-bar').hidden=S.selected.size===0;
 $('compare-bar').innerHTML=`<span>Đã chọn <strong>${S.selected.size}/2</strong> bản phối</span><button class="text-button" data-action="clear-compare">Bỏ chọn</button><button class="primary-button" data-action="compare" ${S.selected.size!==2?'disabled':''}>So sánh ${icon('compare')}</button>`;
 count();
}
