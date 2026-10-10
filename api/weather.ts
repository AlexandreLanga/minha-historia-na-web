const WEATHER_API_URL =
  'https://api-utilidades.onrender.com/api/v1/clima/cidade?cidade=Chapecó';

export async function GET(): Promise<Response> {
  const jwt = process.env['API_UTILIDADES_JWT'];

  if (!jwt) {
    return Response.json(
      { error: 'Weather API secret is not configured' },
      { status: 503 }
    );
  }

  return fetch(WEATHER_API_URL, { headers: { 'X-API-KEY': jwt } });
}
