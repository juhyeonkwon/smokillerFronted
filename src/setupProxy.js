const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(    
    createProxyMiddleware('/api', {
      target : 'http://175.200.110.202:8000/',
      changeOrigin: true
    }),
  )
};
