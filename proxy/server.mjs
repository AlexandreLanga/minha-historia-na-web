import { createServer } from 'node:http';

const jwt = process.env['API_UTILIDADES_JWT'];
if (!jwt) {
  throw new Error('The API_UTILIDADES_JWT environment variable is required');
}

const allowedOrigins = (process.env['FRONTEND_ORIGIN'] ??
  'https://alexandrelanga.github.io,http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const weatherEndpoint =
  'https://api-utilidades.onrender.com/api/v1/clima/Chapecó';

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');

  if (url.pathname === '/health' && request.method === 'GET') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  const origin = request.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    sendJson(response, 403, { error: 'Origin is not allowed' });
    return;
  }

  if (origin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    sendJson(response, 400, { error: 'Invalid request path' });
    return;
  }

  if (
    request.method !== 'GET' ||
    pathname !== '/api/v1/clima/Chapecó'
  ) {
    sendJson(response, 404, { error: 'Not found' });
    return;
  }

  try {
    const upstream = await fetch(weatherEndpoint, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      signal: AbortSignal.timeout(15000),
    });
    const body = await upstream.arrayBuffer();

    if (!upstream.ok) {
      console.error(`Weather API returned HTTP ${upstream.status}`);
    }

    response.writeHead(upstream.status, {
      'Cache-Control': 'no-store',
      'Content-Type':
        upstream.headers.get('content-type') ?? 'application/json',
    });
    response.end(Buffer.from(body));
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError';
    console.error('Weather API request failed:', error);
    sendJson(response, timedOut ? 504 : 502, {
      error: timedOut
        ? 'Weather API request timed out'
        : 'Weather API is unavailable',
    });
  }
});

const port = Number(process.env['PORT'] ?? 3000);
server.listen(port, '0.0.0.0', () => {
  console.log(`Weather proxy listening on port ${port}`);
});
