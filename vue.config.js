// vue.config.js for less-loader@6.0.0
module.exports = {
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#DC143C',
            'link-color': '#800000',
            'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};