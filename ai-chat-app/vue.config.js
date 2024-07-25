const { defineConfig } = require('@vue/cli-service')

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath:'statci/index.html',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
