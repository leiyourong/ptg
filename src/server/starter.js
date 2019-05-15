const express = require('express')
const app = express()

const route = require('./route');
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
 
app.use(allowCrossDomain)
app.use(express.static('webwork'))
app.use(express.static('public'))
app.use(express.static('dist'))

app.use(route)

app.listen(1215, () => {
  console.log('Server is now running at : 1215.')
})
