const target = 'https://api-utilidades.onrender.com';

module.exports = {
  '/api/weather': {
    target,
    secure: true,
    changeOrigin: true,
    pathRewrite: () => '/api/v1/clima/cidade?cidade=Chapec%C3%B3',
    headers: { 'X-API-KEY': process.env.API_UTILIDADES_JWT || '' },
  },
};
