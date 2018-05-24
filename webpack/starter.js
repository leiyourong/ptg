const express = require('express')
const webpack = require('webpack')
const app = express()
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
  })
)
app.use(webpackHotMiddleware(compiler, {
    log: console.log
  })
)

app.listen(1215, () => {
  console.log('Server is now running at : 1215.')
})
