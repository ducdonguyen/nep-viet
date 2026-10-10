/* Bộ biểu tượng nét mảnh dùng trong giao diện. */
const paths={
 arrow:'M4 12h15m-6-6 6 6-6 6',chevron:'m9 5 7 7-7 7',down:'m6 9 6 6 6-6',check:'m5 12 4 4L19 6',close:'m6 6 12 12M18 6 6 18',plus:'M12 5v14M5 12h14',
 heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z',
 bookmark:'M6 3h12v18l-6-4-6 4Z',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',upload:'M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5',share:'M12 15V3m-5 5 5-5 5 5M6 10H4v11h16V10h-2',
 reset:'M3 10a9 9 0 1 1 1 7M3 4v6h6',spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z',book:'M12 5C9 2 5 2 2 3v16c4-1 7-1 10 2 3-3 6-3 10-2V3c-3-1-7-1-10 2Zm0 0v16',
 flower:'M12 10C4-4 1 8 8 12-4 19 9 25 12 15c3 10 16 4 4-3 7-4 4-16-4-2ZM12 10v5',camera:'M3 6h4l2-3h6l2 3h4v14H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2',
 leaf:'M5 20C0 8 9 1 21 3c1 11-6 18-16 17Zm0 0L17 7',temple:'M2 9h20L12 3 2 9ZM4 21h16M6 11v7m6-7v7m6-7v7M3 18h18',hat:'M2 15 12 5l10 10c-5 4-15 4-20 0Zm0 0h20M8 18v3m8-3v3',wrap:'M3 12C3 1 21 1 21 12v4c-4 4-14 4-18 0Zm0 0c6-5 12-5 18 0M3 16c5-4 13-4 18 0',fan:'m12 21-10-13a13 13 0 0 1 20 0L12 21ZM12 21V3m0 18L6 5m6 16 6-16',bag:'M5 8h14l2 13H3L5 8Zm3 0V6a4 4 0 0 1 8 0v2M7 12h10M7 16h10',
 shirt:'m8 3 4 3 4-3 6 5-4 5v8H6v-8L2 8l6-5Z',compare:'M3 4h7v16H3Zm11 0h7v16h-7Z',info:'M12 10v7m0-10v.1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',search:'M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',edit:'m3 17 1 4 4-1L21 7l-5-5L3 17Zm10-12 5 5',trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',external:'M14 3h7v7m0-7L10 14M11 3H3v18h18v-8',grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',pin:'M12 22s8-8 8-14A8 8 0 0 0 4 8c0 6 8 14 8 14Zm3-14a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
};
export function icon(name,cls=''){return `<svg class="icon ${cls}" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]||paths.spark}"/></svg>`;}
