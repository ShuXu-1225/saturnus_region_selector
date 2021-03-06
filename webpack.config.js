const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry:
    process.env.NODE_ENV === 'production' ?
      './src/main_plugin.js' :
        {
          index: ['./src/main.js']
        },
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 输出解析文件的目录，指定资源文件引用的目录 ，打包后浏览器访问服务时的 url 路径中通用的一部分。
    path: path.resolve(__dirname, './Lib'), // 所有输出文件的目标路径;打包后文件在硬盘中的存储位置
    filename: process.env.NODE_ENV === 'production' ? 'v_region_selector.js' : '[name]-[hash].bundle.js',
    library: 'v_region_selector', // 使用 require 时的模块名

    /**
     * “var” - 以一个变量形式输出： var Library = xxx (default)；
     * “this” - 以 this 的一个属性输出： this[“Library”] = xxx；
     * “commonjs” - 以 exports 的一个属性输出：exports[“Library”] = xxx；
     * “commonjs2” - 以 module.exports 形式输出：module.exports = xxx；
     * “amd” - 以 AMD 格式输出；
     * “umd” - 同时以 AMD、CommonJS2 和全局属性形式输出。
     */
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名，否则就使用匿名 define
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              {
                loader: "css-loader",
                options: {
                  // ***** 解决 页面无样式问题 *****
                  // css-loader 4.0后，esModule 默认为 true
                  esModule: false
                }
              },
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              {
                loader: "css-loader",
                options: {
                  // ***** 解决 页面无样式问题 *****
                  // css-loader 4.0后，esModule 默认为 true
                  esModule: false
                }
              },
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        // 它会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // 它会应用到普通的 `.css` 文件以及 `.vue` 文件中的 `<style>` 块
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: "css-loader",
            options: {
              // ***** 解决 页面无样式问题 *****
              // css-loader 4.0后，esModule 默认为 true
              esModule: false
            }
          }
        ],
      },
      {
        // 普通的 `.scss` 文件 和 `*.vue` 文件中的 `<style lang="scss">` 块都应用它
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: "css-loader",
            options: {
              // ***** 解决 页面无样式问题 *****
              // css-loader 4.0后，esModule 默认为 true
              esModule: false
            }
          },
          "sass-loader"
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          {
            loader: "css-loader",
            options: {
              // ***** 解决 页面无样式问题 *****
              // css-loader 4.0后，esModule 默认为 true
              esModule: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ],
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          esModule: false
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    // ***** 请确保引入这个插件 *****
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': '/src'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    port: 8081,
    open: true,
    hot: true,
    noInfo: false, // true 告诉开发服务器禁止显示诸如 Webpack 捆绑包信息之类的消息。 错误和警告仍将显示。
    historyApiFallback: false, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。
    overlay: true, // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。
    inline: true, // 在开发服务器的两种不同模式之间切换。默认情况下，应用程序将启用 inline模式。这意味着将在 bundle 中插入脚本以进行实时重新加载，并且构建消息将出现在浏览器控制台中。也可以使用 iframe模式，它在通知栏下使用带有有关构建消息的<iframe>。
    stats: 'errors-only', //精确控制显示哪些捆绑软件信息。'none' | 'errors-only' | 'minimal' | 'normal' | 'verbose'。注意：与 quiet 或 noInfo 一起使用时，该选项无效。
    onListening: function (server) {
      // const port = server.listeningApp.address().port;
      // console.log('Listening on port:', port);
    }
  },
  target: 'web', // ***** 解决 webpack 5 HMR 失效问题 *****
  performance: {
    hints: false
  },
  devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    // todo 压缩提取 样式 webpack 4.x 前 ExtractTextPlugin ｜ webpack 4.x 后 MiniCssExtractPlugin
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "*** html-webpack-plugin ***",
      chunks: ["index"],
      inject: true // Inject all scripts into the body
    })
  ])
}

