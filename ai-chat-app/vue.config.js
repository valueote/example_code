const { defineConfig } = require('@vue/cli-service')

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath:'static/index.html',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('ion-')
        }
      }))
  },
  css: {
    loaderOptions: {
        postcss: {
            postcssOptions: {
                plugins: [
                    require('autoprefixer'),
                    require('tailwindcss'),
                    // add any other PostCSS plugins here
                ],
            },
        },
    },
  },
};
