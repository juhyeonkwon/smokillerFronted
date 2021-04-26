const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //target: 'http://175.200.110.202:8000',
      target: 'http://localhost:3333',
      changeOrigin: true
    })
  );
};