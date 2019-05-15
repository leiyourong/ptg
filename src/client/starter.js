const express = require('express')
const webpack = require('webpack')
const app = express()
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('../../webpack.client.config.js')
const compiler = webpack(config)

app.use(express.static('webwork'))
app.use(express.static('public'))
app.use(express.static('dist'))

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
  })
)
app.use(webpackHotMiddleware(compiler, {
    log: console.log
  })
)

app.listen(3000, () => {
  console.log('Server is now running at : 3000.')
})
