
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/minha-historia-na-web/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Program%20Files/Git/minha-historia-na-web/dashboard",
    "route": "/Program%20Files/Git/minha-historia-na-web"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/minha-historia-na-web/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/minha-historia-na-web/my-history"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/minha-historia-na-web/profissional"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/minha-historia-na-web/about-me"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6142, hash: 'ebbcef17d8b42b3eb964eab508e4f6caad9d29552ad3759cbc8cf187de01e06a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5396, hash: '3074d993bf93d0a3f581cfc751284181ee16ff7b99284bfa8b698abde101b4a3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-VC7CXGIE.css': {size: 73881, hash: '2fahgpBcZDM', text: () => import('./assets-chunks/styles-VC7CXGIE_css.mjs').then(m => m.default)}
  },
};
