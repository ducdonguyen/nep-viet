/* Vẽ người mẫu minh họa bằng SVG (cũng dùng để xuất hình tải về). */
import {describe,validConfig,escapeHtml} from '../core/domain.mjs';
let counter=0;
export function outfitSVG(c,{exported=false}={}){
 if(!validConfig(c))throw new Error('Cấu hình hình không hợp lệ.');
 const d=describe(c),p='n'+(++counter),col=d.color.hex,bot=d.bottom.hex;
 const has=id=>c.accessories.includes(id), tu=c.garment==='tu-than',ngu=c.garment==='ngu-than';
 const long=c.avatar==='toc-dai';
 const silhouette=tu?'M251 186 237 203 220 312 228 337 222 502Q241 517 258 510L279 291 301 510Q320 515 337 501L328 329 320 202 300 187 294 230 280 271 264 229Z':ngu?'M262 179 244 189Q234 191 228 212L203 305 225 315 244 260 232 512Q282 536 331 512L317 260 338 315 360 305 333 212Q326 191 308 187L299 179Z':'M263 179 246 191Q236 195 231 211L212 302 231 310 250 247Q249 275 255 295L230 508Q245 520 263 512L277 376 279 513Q305 526 329 504L304 294Q310 273 308 247L330 309 349 301 329 211Q325 195 312 190L298 180Z';
 const motif=c.style==='pha-cach'?`<g opacity=".45" fill="#f5deb0"><path d="M282 387c-38-26-55-5-28 18-25 22 4 47 28 16 25 29 50 2 27-18 24-24 2-45-27-16Z"/><circle cx="282" cy="407" r="7" fill="${col}"/></g>`:c.style==='thanh-lich'?`<g fill="none" stroke="#ead7a5" stroke-width="1.5" opacity=".65"><path d="M299 488Q262 422 297 363M281 440q-29 0-21-26 27 4 21 26ZM286 410q26 0 24-24-29 3-24 24ZM290 385q-19-6-10-24 18 9 10 24Z"/><path d="M299 460q16-2 17-20-23 1-17 20Z"/></g>`:'';
 const scene=c.backdrop==='san-dinh'?`
 <circle cx="386" cy="147" r="59" fill="#d3b885" opacity=".25"/>
 <g fill="none" stroke="#79836b" stroke-width="1" opacity=".28">
 <path d="M77 559V250Q77 169 153 159V550M408 550V159q77 10 77 91v309M93 545V254q0-69 60-76M408 178q59 10 59 76v291"/>
 <path d="M47 203Q126 190 164 131h233q42 59 119 72M70 204h427M93 212h377M157 131h247M186 117h181M207 107h139M175 142l-37 36m66-36-27 36m54-36-16 36m44-36-5 36m43-36 4 36m26-36 16 36m13-36 28 36m0-36 38 36M105 220v319m356-319v319M55 554h451M29 579h511M10 613h540M45 648l123-69m70 69 20-69m124 69-37-69m174 69-93-69"/>
 <path d="M127 261h26m-26 44h26m-26 44h26m-26 44h26m-26 44h26m-26 44h26M408 261h26m-26 44h26m-26 44h26m-26 44h26m-26 44h26m-26 44h26M127 241v289m307-289v289"/>
 </g>
 <g fill="#768069" opacity=".5"><path d="M30 590q24-100 79-157-34 86-79 157Z"/><path d="M52 525q-70-20-36-68 51 19 36 68ZM62 502q10-72 56-56-7 49-56 56ZM28 566q-29-39-23-60 37 13 23 60ZM75 479q-40-39-26-65 39 20 26 65ZM90 455q0-47 36-55-3 42-36 55Z"/></g>
 <g fill="none" stroke="#858770" stroke-width="1.5" opacity=".45"><path d="M491 450q-15-102 43-216M506 350l-28-34m35 14 27-15M525 287l-17-22"/><path d="M529 261q-12-44 18-69-1 45-18 69ZM517 299q-30-33-17-63 25 22 17 63ZM506 339q-26-24-23-49 28 15 23 49ZM517 321q33-13 38-42-31 0-38 42Z"/></g>`:`<circle cx="280" cy="302" r="208" fill="#dbcfb7" opacity=".32"/><path d="M70 562h420" stroke="#d6c8ad"/>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 660" width="560" height="660" role="img" aria-labelledby="${p}title" class="outfit-svg">
 <title id="${p}title">${escapeHtml(d.garment.name+' '+d.color.name+' · '+d.style.name+' · '+(d.accessories.map(a=>a.name).join(', ')||'không phụ kiện'))}</title>
 <defs>
 <linearGradient id="${p}cloth" x1="0" y1="0" x2="1" y2=".18"><stop stop-color="${col}"/><stop offset=".36" stop-color="${col}"/><stop offset=".59" stop-color="#fff" stop-opacity=".17"/><stop offset=".77" stop-color="${col}"/><stop offset="1" stop-color="#241f1b" stop-opacity=".24"/></linearGradient>
 <linearGradient id="${p}shade"><stop stop-color="#fff" stop-opacity=".07"/><stop offset=".45" stop-color="#fff" stop-opacity=".25"/><stop offset=".65" stop-color="#271d19" stop-opacity=".06"/><stop offset="1" stop-color="#211b17" stop-opacity=".2"/></linearGradient>
 <pattern id="${p}grain" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".5" fill="#3a3126" opacity=".10"/><circle cx="4" cy="5" r=".4" fill="#fff" opacity=".3"/></pattern>
 <clipPath id="${p}clip"><path d="${silhouette}"/></clipPath>
 </defs>
 <rect width="560" height="660" fill="#EDEADC"/>
 <rect x="16" y="16" width="528" height="628" rx="180" fill="none" stroke="#c5baa3" opacity=".3"/>
 ${scene}
 <ellipse cx="283" cy="595" rx="98" ry="13" fill="#6a6555" opacity=".12"/>
 <g>
 ${long?'<path d="M257 112q-16 25-12 78l-5 50q35 20 79-2l-8-68q3-51-19-57Z" fill="#2D302B"/>':''}
 <path d="M248 490h37l-9 92h-30ZM285 490h34l5 92h-32Z" fill="${bot}" stroke="#665a48" stroke-opacity=".25"/>
 <path d="M253 496h23l-7 85h-16ZM293 497h20l4 85h-17Z" fill="url(#${p}shade)"/>
 ${tu?`<path d="M247 290 223 554q57 22 112 0l-28-264Z" fill="${bot}"/><path d="m252 334-12 219m27-221-6 224m28-224 8 224m7-227 15 221" stroke="#3d342b" stroke-opacity=".18" fill="none"/>`:''}
 ${c.style==='pha-cach'?'<path d="m246 579-15 10q-4 7 5 9h39v-16ZM294 582v16h44q6-3 0-7l-17-12Z" fill="#f5eee1" stroke="#a89a80"/><path d="M235 593h38m22 0h39m-80-8h12m39 0h12" stroke="#9b8066"/>':'<path d="m247 579-13 13q-3 5 6 6h34l2-18ZM294 580v17h36q10-1 5-7l-14-11Z" fill="#4b4138"/><path d="M241 591h29m29 0h27" stroke="#9e8262" stroke-width="1.2"/>'}
 <path d="m217 299-9 28q-3 14 5 20 6 0 7-13l8-28ZM336 303l8 28q1 9-4 13-8-2-9-15l-5-19Z" fill="#c99a78" stroke="#ad7e61" stroke-width=".7"/>
 <path d="M270 164v22q10 17 23 0v-22Z" fill="#ce9d79"/>
 <path d="M270 168q10 7 23 0v8q-10 6-23 0Z" fill="#b98563" opacity=".4"/>
 <path d="${silhouette}" fill="${col}" stroke="#4e3428" stroke-opacity=".22"/>
 <path d="${silhouette}" fill="url(#${p}shade)"/>
 <g clip-path="url(#${p}clip)">${motif}<path d="M248 207q17 38 13 74M312 209q-14 38-12 73m-47 35-13 176m67-177 9 168m-37-172 8 183" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="2"/><path d="M232 497q50 18 100 0" fill="none" stroke="#ecd7aa" stroke-width="2" opacity=".6"/></g>
 ${tu?`<path d="M267 190 280 182 296 192 301 276 256 277Z" fill="#cead70"/><path d="m267 190 13-7 16 9" fill="none" stroke="#f0d9ad" stroke-width="3"/><path d="M262 182q-7 18-15 26l27 76-33 207 18 13 21-213-16-77ZM300 183q7 17 16 26l-32 80 17 215 18-12-28-210 17-68Z" fill="${col}"/><path d="M251 276q29 11 58 0l-1 19q-28 10-57 0Z" fill="#b57956"/><path d="m279 294-15 113 11 16 11-124 10 102 13-12-19-96Z" fill="#d7b16f"/>`:`<path d="m266 178 14 9 17-9 2 15-18 7-17-8Z" fill="${col}" stroke="#e3c599" stroke-width="1"/><path d="m281 198 25 17 0 65" fill="none" stroke="#e3c599" stroke-width="1.2"/>${(ngu?[202,218,236,254,272]:[205,222,241]).map((y,i)=>`<circle cx="${i===0?289:305}" cy="${y}" r="2.3" fill="#d6b16c"/>`).join('')}`}
 <ellipse cx="280" cy="141" rx="24" ry="34" fill="#d7ad87"/>
 <path d="M258 137q-4-33 22-35 32 0 26 37-11-13-14-22-11 19-34 20Z" fill="#2f332d"/>
 ${long?'<path d="M258 123q-15 27-5 52l-6 43q13-10 15-36l-3-41Zm44-2q18 15 11 42l3 40q-13-14-12-31l-3-31Z" fill="#2f332d"/>':'<path d="M256 135q-7-20 8-28 23-14 39 1 13 12 4 33l-8-19q-20 9-40 8Z" fill="#2f332d"/>'}
 <g fill="none" stroke="#71513d" stroke-width="1" stroke-linecap="round"><path d="m264 142 6-1m21 0 6 1m-15 0-2 10 3 1m-9 7q6 3 12-1"/></g><path d="m264 151 6 1m23-1 5-1" stroke="#bf795e" stroke-width="3" opacity=".25"/>
 ${has('khan-van')?`<path d="M252 119q-7-24 28-27 37 1 34 28-29-14-62-1Z" fill="${col}" stroke="#6a5740"/><path d="M253 114q31-16 60 0m-57-8q25-12 52-1" stroke="#e3cfab" stroke-opacity=".6" fill="none"/>`:''}
 ${has('non-la')?'<path d="M219 118 279 66 346 116Q288 134 219 118Z" fill="#d3b777" stroke="#9c8350" stroke-width="1.2"/><path d="M227 112q55 12 111-1m-98-10q40 8 84 0m-70-12q28 5 53 1m-27-22-3 54m3-54-36 50m36-50 40 49" fill="none" stroke="#aa8e54" stroke-width=".7"/><path d="M241 120q12 82 66 13" fill="none" stroke="#796d59" stroke-width="2"/><ellipse cx="282" cy="118" rx="62" ry="5" fill="#b5975c" opacity=".35"/>':''}
 ${has('quat')?'<g transform="translate(340 326) rotate(14)"><path d="M0 0-50-52Q-2-87 39-43Z" fill="#dbbb78" stroke="#9f8658"/><path d="m0 0-50-52M0 0l-37-60M0 0l-22-64M0 0l-8-64M0 0 8-62M0 0l22-55M0 0l39-43" stroke="#947544" stroke-width=".9"/><path d="M-46-48Q-5-80 35-39" fill="none" stroke="#b04735" stroke-width="6" opacity=".75"/><circle r="3" fill="#785838"/></g>':''}
 ${has('tui-may')?'<path d="M325 354q0-41 17-41 18 1 20 41" fill="none" stroke="#8e714a" stroke-width="4"/><path d="M322 348h44l7 48q-27 17-55 0Z" fill="#bea073" stroke="#967449"/><path d="M322 357h45m-46 8h48m-49 8h50m-51 8h53m-52 8h52m-42-40-5 48m16-48v51m10-51 5 48" stroke="#89683c" stroke-opacity=".55"/>':''}
 <path d="m335 325 5 4q6-1 7 3l-4 5q-9 0-9-10" fill="#c99a78"/>
 </g>
 <rect width="560" height="660" fill="url(#${p}grain)" pointer-events="none"/>
 ${exported?`<rect y="613" width="560" height="47" fill="#f6f0e4"/><text x="24" y="636" fill="#873d30" font-family="'Times New Roman','Noto Serif',serif" font-size="16">Nếp Việt · ${escapeHtml(d.garment.name)}</text><text x="24" y="651" fill="#706659" font-family="sans-serif" font-size="10">Mockup minh họa · ${escapeHtml(d.color.name+' · '+d.style.name)}</text>`:''}
 </svg>`;
}
