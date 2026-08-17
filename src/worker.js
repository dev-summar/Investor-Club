// ============================================================================
// CLOUDFLARE WORKER: INVESTOR'S CLUB TRADING TERMINAL
// Handles SPA Static Assets & Mega Bull API Edge Reverse Proxy (Zero CORS)
// ============================================================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Edge Reverse Proxy for Mega Bull Live API
    if (url.pathname.startsWith('/api/megabull')) {
      const targetPath = url.pathname.replace(/^\/api\/megabull/, '');
      const targetUrl = new URL(targetPath + url.search, 'https://api.megabull.in');

      // Clone original headers
      const proxyHeaders = new Headers(request.headers);
      proxyHeaders.set('Host', 'api.megabull.in');
      proxyHeaders.set('Origin', 'https://api.megabull.in');
      proxyHeaders.set('Referer', 'https://api.megabull.in/');

      // Handle CORS Preflight (OPTIONS)
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400'
          }
        });
      }

      try {
        const response = await fetch(targetUrl.toString(), {
          method: request.method,
          headers: proxyHeaders,
          body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.blob()
        });

        // Add permissive CORS headers to response
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        newHeaders.set('Access-Control-Allow-Headers', '*');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Edge Proxy Failed', message: err.message }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // 2. Serve Static Assets with SPA Fallback
    try {
      let response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes('.')) {
        // SPA Fallback: serve index.html for client-side routing
        const indexUrl = new URL('/index.html', request.url);
        response = await env.ASSETS.fetch(new Request(indexUrl, request));
      }
      return response;
    } catch (e) {
      return new Response('Internal Asset Error: ' + e.message, { status: 500 });
    }
  }
};
