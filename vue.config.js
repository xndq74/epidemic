const { defineConfig } = require('@vue/cli-service')

const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/news': { // 匹配所有以 '/v1_0'开头的请求路径
        target: 'https://interface.sina.cn', // 代理目标的基础路径
        changeOrigin: true
        // pathRewrite: { '^/v1_0': '' }
      },
      '/ug': {
        target: 'http://c.m.163.com/', // 代理目标的基础路径
        changeOrigin: true
        // pathRewrite: { '^/v1_0': '' }
      },
      '/2021': {
        target: 'http://file1.dxycdn.com', // 代理目标的基础路径
        changeOrigin: true
        // pathRewrite: { '^/v1_0': '' }
      }
      // publicPath: './'

    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(__dirname, './src/styles/cover.less')}";`
          }
        }
      }
    }
  }
  // publicPath: './'

})
