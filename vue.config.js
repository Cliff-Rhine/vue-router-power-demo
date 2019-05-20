
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-router-power-demo/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  }
}
