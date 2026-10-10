import {count,toast} from '../components/ui.mjs';
import {S,repo} from './state.mjs';
import {renderCollection} from '../pages/collection.mjs';
import {renderExplore} from '../pages/explore.mjs';

/* Chuyển giữa 3 trang: Khám phá, Phòng phối đồ, Bộ sưu tập. */
export function setView(next,scroll=true){
 if(!['studio','explore','collection'].includes(next))return;
 S.view=next;document.querySelectorAll('.page-view').forEach(el=>el.hidden=el.id!==next+'-view');
 document.querySelectorAll('.main-nav [data-view]').forEach(el=>{el.classList.toggle('active',el.dataset.view===next);if(el.dataset.view===next)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
 if(next==='collection'){try{S.looks=repo.read();count();}catch(e){toast(e.message,true);}renderCollection();}
 if(next==='explore')renderExplore();
 if(scroll)window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
