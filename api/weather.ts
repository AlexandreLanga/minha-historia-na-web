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

  const upstream = await fetch(WEATHER_API_URL, {
    headers: { 'X-API-KEY': jwt },
  });

  // Não repassar os headers do upstream: o corpo já vem descomprimido e o
  // Content-Encoding original quebraria a leitura no navegador.
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: {
      'Content-Type':
        upstream.headers.get('Content-Type') ?? 'application/json',
    },
  });
}
