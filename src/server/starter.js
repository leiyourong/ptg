const express = require('express')
// const webpack = require('webpack')
const app = express()
// const webpackHotMiddleware = require('webpack-hot-middleware')
// const webpackDevMiddleware = require('webpack-dev-middleware')

// const config = require('./webpack.server.config.js')
// const compiler = webpack(config)
const route = require('./route');
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
 
app.use(allowCrossDomain)
app.use(express.static('webwork'))
app.use(express.static('public'))
app.use(express.static('dist'))

app.use('/', route)

// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     stats: {colors: true}
//   })
// )
// app.use(webpackHotMiddleware(compiler, {
//     log: console.log
//   })
// )

app.listen(1215, () => {
  console.log('Server is now running at : 1215.')
})
