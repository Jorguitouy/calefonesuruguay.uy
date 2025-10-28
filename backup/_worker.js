// Cloudflare Worker para redirección automática
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Redirección permanente a reparaciondecalefones.uy
    const targetUrl = 'https://reparaciondecalefones.uy/';
    
    // Preservar cualquier path o query parameters
    const fullTargetUrl = targetUrl + url.pathname.substring(1) + url.search;
    
    return Response.redirect(fullTargetUrl, 301);
  }
}