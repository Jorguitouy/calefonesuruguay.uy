// Function que intercepta la ruta raíz
export async function onRequestGet(context) {
  const targetUrl = 'https://reparaciondecalefones.uy/';
  
  return Response.redirect(targetUrl, 301);
}

export async function onRequestPost(context) {
  const targetUrl = 'https://reparaciondecalefones.uy/';
  
  return Response.redirect(targetUrl, 301);
}

export async function onRequest(context) {
  const targetUrl = 'https://reparaciondecalefones.uy/';
  
  return Response.redirect(targetUrl, 301);
}