
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/minha-historia-na-web',
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
    'index.csr.html': {size: 6141, hash: '70842c70e2844e8aab8380754fc31e3a31b0184ba8144c798000c7622573df11', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5395, hash: '37ec74c25a7fac8dc4997daa03e11ecfef376d9a96caeb7148759ff1829beaaa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-VC7CXGIE.css': {size: 73881, hash: '2fahgpBcZDM', text: () => import('./assets-chunks/styles-VC7CXGIE_css.mjs').then(m => m.default)}
  },
};
