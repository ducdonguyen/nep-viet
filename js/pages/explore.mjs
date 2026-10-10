import {icon} from '../components/icons.mjs';
import {outfitSVG} from '../components/mannequin.mjs';
import {$,pressed} from '../components/ui.mjs';
import {S} from '../core/state.mjs';
import {GARMENTS,PRESETS} from '../data/catalog.mjs';

/* Trang Khám phá. */
export function renderExplore(){
 const regions=[['all','Tất cả'],['bac','Bắc Bộ'],['trung','Miền Trung'],['nam','Miền Nam']];
 $('region-filters').innerHTML=regions.map(([id,label])=>`<button data-action="region" data-id="${id}" class="${S.region===id?'active':''}" ${pressed(S.region===id)}>${label}</button>`).join('');
 const filtered=GARMENTS.filter(g=>S.region==='all'||g.region===S.region||g.region==='ba-mien');
 $('explore-grid').innerHTML=filtered.map(g=>{
 const p=PRESETS.find(p=>p.config.garment===g.id);
 return `<article class="explore-card"><div class="explore-art">${outfitSVG(p.config)}<span>${g.tag}</span></div><div class="explore-body"><p class="region">${icon('pin')} ${g.regionLabel}</p><h2>${g.name}</h2><p>${g.story}</p><div class="feature-tags">${g.features.map(f=>`<span>${f}</span>`).join('')}</div><div><button class="primary-button small" data-action="use-garment" data-id="${g.id}">Phối thử ${icon('arrow')}</button><button class="text-button" data-action="story" data-id="${g.id}">Câu chuyện & nguồn ${icon('book')}</button></div></div></article>`;
 }).join('');
}
