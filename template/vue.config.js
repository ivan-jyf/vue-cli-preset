const CompressionWebpackPlugin = require('compression-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  },

  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      title: 'vue-project',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'chunk-index-vendors', 'index']
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: {
    //   entry: 'src/subpage/main.js',
    //   template: 'public/subpage.html',
    //   filename: 'subpage.html',
    //   title: 'subpage',
    //   chunks: ['chunk-common', 'chunk-vendors', 'subpage']
    // }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    watchOptions: {
      poll: true
    }
    // MPA api setting
    // historyApiFallback: {
    //   rewrites: [{ from: /\/subpage/, to: '/subpage.html' }]
    // }
  },

  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

    if (process.env.NODE_ENV === 'production') {
      config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())
      // 生产环境才开启 不然开发时lodash函数不起作用 也不报错
    }

    const options = module.exports
    const pages = options.pages
    const pageKeys = Object.keys(pages)

    const IS_VENDOR = /[\\/]node_modules[\\/]/

    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          priority: 30,
          chunks: 'initial',
          minChunks: 2,
          test: IS_VENDOR,
          enforce: true
        },
        ...pageKeys.map(key => ({
          name: `chunk-${key}-vendors`,
          priority: 20,
          chunks: chunk => chunk.name === key,
          test: IS_VENDOR,
          enforce: true
        })),
        common: {
          name: 'chunk-common',
          priority: 10,
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        publicPath: isProduction ? '' : '', // CDN url
        name: 'img/[name].[hash:8].[ext]'
      })

    config.module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10,
        publicPath: isProduction ? '' : '', // CDN url
        outputPath: 'img',
        name: '[name].[hash:8].[ext]'
      })
      .end()

    config.resolve.symlinks(true)
    config.plugin('preload').tap(options => {
      options[0] = {
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style'
          if (/\.(woff||ttf)$/.test(entry)) return 'font'
          if (/\.png$/.test(entry)) return 'image'
          return 'script'
        },
        include: 'allAssets',
        fileBlacklist: [/\.map$/, /hot-update\.js$/]
      }
      return options
    })

    config.plugins.delete('html')
    config.plugins.delete('preload')

    return config
  },

  lintOnSave: false,

  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: 'static',
      openAnalyzer: false
    }
  }
}
