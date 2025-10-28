// Cloudflare Pages Function - Maneja TODAS las rutas
export async function onRequest(context) {
  // Redirección permanente para cualquier ruta
  const targetUrl = 'https://reparaciondecalefones.uy/';
  
  return new Response(null, {
    status: 301,
    headers: {
      'Location': targetUrl,
      'Cache-Control': 'max-age=31536000', // Cache por 1 año
      'X-Redirect-Reason': 'Site moved to reparaciondecalefones.uy'
    }
  });
}