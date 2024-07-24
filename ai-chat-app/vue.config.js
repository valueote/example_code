const { defineConfig } = require('@vue/cli-service')

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
