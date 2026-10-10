const fs = require('fs');
const path = require('path');

function loadEnv() {
  const file = path.join(__dirname, '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (line.trim().startsWith('#')) continue;
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const value = match[2].replace(/^(['"])(.*)\1$/, '$2');
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

loadEnv();

if (!process.env.API_UTILIDADES_JWT) {
  console.warn('[proxy] API_UTILIDADES_JWT não definido no .env');
}

module.exports = {
  '/api/weather': {
    target: 'https://api-utilidades.onrender.com',
    secure: true,
    changeOrigin: true,
    pathRewrite: { '^/api/weather.*$': '/api/v1/clima/cidade?cidade=Chapec%C3%B3' },
    headers: { 'X-API-KEY': process.env.API_UTILIDADES_JWT || '' },
  },
};
