var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/server/starter.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'isomorphic-style-loader',
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
        loader: 'babel-loader'
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
    extensions: ['*', '.js', '.css', '.jsx']
  }
}
