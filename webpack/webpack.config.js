var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../src'),
  mode: 'development',
  entry: {
    bundle: ['./index.js', 'webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true'], //mix
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
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
        use: [{
          loader: 'style-loader'
        }, {
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
              require('postcss-cssnext'),
              require('autoprefixer')
            ]
          }
        }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
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
  resolve: {
    extensions: ['*', '.js', '.css', '.jsx'],
    alias: {
      'vue$'  : 'vue/dist/vue.min'
    }
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Noobme',
      template: path.resolve('./tmpl/index.tmpl'), // mix react
      hash: true,
      inject: true,
      filename: 'index.html'
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map', //错误报在原js上
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  }
}
