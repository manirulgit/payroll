const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy configuration for API calls
  app.use(
    '/api/proxy',
    createProxyMiddleware({
      target: 'https://jyotiaircon.com',
      changeOrigin: true,
      secure: false, // Set to false to handle SSL issues
      logLevel: 'debug',
      pathRewrite: {
        '^/api/proxy': '/admin/api',
      },
      onProxyReq: function(proxyReq, req, res) {
        console.log(`🔄 Proxying ${req.method} ${req.url} → https://jyotiaircon.com${proxyReq.path}`);
        
        // Set headers to mimic a real browser request
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        proxyReq.setHeader('Accept', 'application/json, text/plain, */*');
        proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.9');
        proxyReq.setHeader('Cache-Control', 'no-cache');
        proxyReq.setHeader('Pragma', 'no-cache');
        
        // Remove problematic headers
        proxyReq.removeHeader('origin');
        proxyReq.removeHeader('referer');
        
        // Handle POST data
        if (req.method === 'POST' && req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      onProxyRes: function(proxyRes, req, res) {
        console.log(`✅ Response: ${proxyRes.statusCode} for ${req.method} ${req.url}`);
        
        // Add comprehensive CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');
        res.setHeader('Access-Control-Allow-Credentials', 'false');
        res.setHeader('Access-Control-Max-Age', '86400');
        
        // Remove any conflicting headers from the target server
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
      },
      onError: function(err, req, res) {
        console.error('❌ Proxy error:', err.message);
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end(JSON.stringify({ 
          error: 'Proxy error', 
          message: err.message,
          success: false 
        }));
      }
    })
  );

  // Handle CORS preflight requests
  app.options('/api/proxy/*', (req, res) => {
    console.log(`🔍 CORS preflight for: ${req.url}`);
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Max-Age': '86400'
    });
    res.status(200).end();
  });
};
