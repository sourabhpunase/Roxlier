const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://s3.amazonaws.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // remove /api prefix
    },
  }));
};
