interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  API_UTILIDADES_JWT?: string;
}

const WEATHER_API_URL =
  'https://api-utilidades.onrender.com/api/v1/clima/cidade?cidade=Chapecó';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/weather') {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET' },
      });
    }

    if (!env.API_UTILIDADES_JWT) {
      return Response.json(
        { error: 'Weather API secret is not configured' },
        { status: 503 }
      );
    }

    return fetch(WEATHER_API_URL, {
      headers: { 'X-API-KEY': env.API_UTILIDADES_JWT },
    });
  },
};
