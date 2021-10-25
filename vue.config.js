// const path = require('path')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // // 配置方式一：CLI提供的属性
  // outputDir: './build',
  publicPath: './',
  // // 配置方式二：和webpack的属性完全一致，最后会与webpack的配置合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // 会覆盖之前的配置
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  //   config.plugins = [
  //     Components({
  //       resolvers: [ElementPlusResolver()]
  //     }),
  //     require('unplugin-element-plus/webpack')({
  //       // options
  //     })
  //   ]
  // }
  // 配置方式三：链式
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('components', '@/components')
  // }
}
