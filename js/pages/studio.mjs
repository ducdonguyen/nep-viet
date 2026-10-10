import {icon} from '../components/icons.mjs';
import {outfitSVG} from '../components/mannequin.mjs';
import {$,optionButton,pressed,toast} from '../components/ui.mjs';
import {cloneConfig,describe} from '../core/domain.mjs';
import {S,repo} from '../core/state.mjs';
import {ACCESSORIES,AVATARS,BACKDROPS,BOTTOMS,COLORS,GARMENTS,OCCASIONS,PRESETS,STYLES,byId} from '../data/catalog.mjs';

/* Trang Phòng phối đồ. */
export function persistDraft(){try{repo.saveDraft(S.config);}catch(e){if(!S.draftErrorShown){toast(e.message,true);S.draftErrorShown=true;}}}
export function renderStudio(){
 const d=describe(S.config);
 $('garment-options').innerHTML=GARMENTS.map(g=>optionButton('garment',g,S.config.garment===g.id,'garment-option',`${icon('shirt')}<span>${g.name}</span><span class="radio-mark" aria-hidden="true"></span>`)).join('');
 $('occasion').value=S.config.occasion;$('occasion-icon').innerHTML=icon(byId(OCCASIONS,S.config.occasion).icon);
 $('style-options').innerHTML=STYLES.map(s=>optionButton('style',s,S.config.style===s.id,'chip')).join('');
 $('color-name').textContent=d.color.name;
 $('color-options').innerHTML=COLORS.map(color=>`<button class="swatch${S.config.color===color.id?' active':''}" style="--swatch:${color.hex}" data-action="set" data-field="color" data-value="${color.id}" aria-label="Màu áo ${color.name}" title="${color.name}" ${pressed(S.config.color===color.id)}>${S.config.color===color.id?icon('check'):''}</button>`).join('');
 $('bottom-options').innerHTML=BOTTOMS.map(color=>`<button class="swatch${S.config.bottom===color.id?' active':''}" style="--swatch:${color.hex}" data-action="set" data-field="bottom" data-value="${color.id}" aria-label="Màu ${S.config.garment==='tu-than'?'váy':'quần'} ${color.name}" title="${color.name}" ${pressed(S.config.bottom===color.id)}>${S.config.bottom===color.id?icon('check'):''}</button>`).join('');
 $('bottom-label').textContent=S.config.garment==='tu-than'?'Màu váy':'Màu quần';
 $('accessory-options').innerHTML=ACCESSORIES.map(a=>`<button class="accessory-option${S.config.accessories.includes(a.id)?' active':''}" data-action="accessory" data-value="${a.id}" ${pressed(S.config.accessories.includes(a.id))}>${icon(a.icon)} ${a.name}</button>`).join('');
 $('avatar-options').innerHTML=AVATARS.map(a=>optionButton('avatar',a,a.id===S.config.avatar,'')).join('');
 $('backdrop-options').innerHTML=BACKDROPS.map(b=>optionButton('backdrop',b,b.id===S.config.backdrop,'')).join('');
 $('preview-image').innerHTML=outfitSVG(S.config);
 $('preview-title').textContent=d.color.note;
 $('story-region').textContent=d.garment.regionLabel;
 $('story-title').textContent=d.garment.name;
 $('story-copy').textContent=d.garment.story;
 $('summary-details').innerHTML=`<div class="summary-line">${icon('shirt')}<div><strong>${d.garment.name} · ${d.style.name}</strong><small>${d.occasion.name}</small></div></div><div class="summary-line"><span class="mini-colors"><i style="--swatch:${d.color.hex}"></i><i style="--swatch:${d.bottom.hex}"></i></span><div><strong>${d.color.name} & ${d.bottom.name.toLowerCase()}</strong><small>Áo & ${S.config.garment==='tu-than'?'váy':'quần'}</small></div></div><div class="summary-line">${icon('spark')}<div><strong>${d.accessories.length?d.accessories.map(a=>a.name).join(' · '):'Nét đẹp giản đơn'}</strong><small>${d.accessories.length?'Phụ kiện điểm xuyết':'Không thêm phụ kiện'}</small></div></div>`;
 $('harmony').innerHTML=icon('check')+'<span>'+d.harmony+'</span>';
 $('advice').textContent=d.note;
 $('culture-note').textContent=d.warning;
}
export function applyConfig(c,message){S.config=cloneConfig(c);renderStudio();persistDraft();if(message)toast(message);}
export function renderPresets(){ $('preset-grid').innerHTML=PRESETS.map(p=>`<button class="preset-card" data-action="preset" data-id="${p.id}"><div class="preset-art">${outfitSVG(p.config)}</div><div><h3>${p.title}</h3><p>${p.caption}</p></div>${icon('arrow')}</button>`).join(''); }
