var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var ManifestPlugin = require('webpack-manifest-plugin');

var env = process.env.NODE_ENV || 'production';
var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin({
    filename: 'css/style.css',
  }),
  // Generate a manifest file which contains a mapping of all asset filenames
  // to their corresponding output file so that tools can pick it up without
  // having to parse `index.html`.
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
]
console.log(env);
if (env === 'development') {
  plugins.push(new HtmlwebpackPlugin({
    title: 'Noobme',
    template: path.resolve('./tmpl/index.tmpl'), // mix react
    hash: true,
    inject: true,
    filename: 'index.html'
  }))
}
module.exports = {
  context: path.resolve(__dirname, './src'),
  mode: 'development',
  entry: {
    index: ['./index.js', 'webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true'],
    // bundle: ['./minireact/index.js', 'webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true'], //mix
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',     //webpack-dev-server访问的路径
    // chunkFilename: 'bundle-[id].js'   //输出chunk文件名
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
                loader: 'css-loader', 
                options: {
                  importLoaders: 1
                }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-import'),
                  require('postcss-url'),
                  require('postcss-simple-vars'),
                  require('postcss-nested'),
                  require('postcss-cssnext')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: [
          //     '@babel/env',
          //     '@babel/stage-0',
          //     '@babel/react',
          //     '@babel/es2015',
          //   ],
          //   plugins: [
          //     'transform-decorators-legacy',
          //     ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' }] // `style: true` 会加载 less 文件
          //   ]
          // }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks:{
      chunks: 'async',
    }
  },
  resolve: {
    extensions: ['*', '.js', '.css', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  plugins: plugins,
  devtool: 'source-map', //错误报在原js上
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    hot: true,
    inline: true,
    progress: true,
  }
}
