import {S} from '../core/state.mjs';

/* Tiện ích giao diện dùng chung: chọn phần tử, thông báo, nút tùy chọn, tải tệp. */
export const $=id=>document.getElementById(id);
export function toast(message,error=false){clearTimeout(S.toastTimer);const box=$('toast');box.textContent=message;box.className='toast'+(error?' error':'');box.hidden=false;S.toastTimer=setTimeout(()=>{box.hidden=true;},error?8000:4500);}
export function count(){ $('book-count').textContent=S.looks.length; }
export function pressed(on){return `aria-pressed="${on}"`;}
export function optionButton(field,item,active,cls,label=item.name){return `<button class="${cls}${active?' active':''}" data-action="set" data-field="${field}" data-value="${item.id}" ${pressed(active)}>${label}</button>`;}
export function downloadFile(content,type,name){
 const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);
}
