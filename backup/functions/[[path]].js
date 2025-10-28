// Función que maneja rutas dinámicas [[path]]
export async function onRequest({ request, params }) {
  const targetUrl = 'https://reparaciondecalefones.uy/';
  
  // Log para debug (visible en Cloudflare Dashboard)
  console.log('Redirecting path:', params.path);
  
  return new Response(null, {
    status: 301,
    headers: {
      'Location': targetUrl,
      'Cache-Control': 'public, max-age=31536000',
      'X-Redirect-From': request.url,
      'X-Redirect-To': targetUrl
    }
  });
}