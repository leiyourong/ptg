const http = require('http')
const https = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
const chalk = require('chalk')
const path = require('path')

let urlArray = []
let allUrlArray = []
let targetFile = ''
let num = 0
let totalNum = 9999
module.exports = (url, dist, num) => {
    targetFile = dist
    totalNum = num
    getHtml(url)
}

function getHtml(url) {
    getProtocol(url).get(url, function(res, err) {
        if (!err) {
            let html = ''
            res.on('data', function(data) {
                html += data
            })
            res.on('end', function() {
                callback(html, url)
            })
        }
    })
}

/**
 * @description 拉取目标地址图片
 * @param {string} url 目标地址
 */
function getImg(url) {
    getProtocol(url).get(url, function(res) {
        var imgData = ''
        res.setEncoding('binary') // 一定要设置 response 的编码为 binary 否则会下载下来的图片打不开
        res.on('data', function(chunk) {
            imgData += chunk
        })
        var fileName = path.basename(url)
        var validIndex = fileName.indexOf('!')
        if (validIndex !== -1) {
            fileName = fileName.substring(0, validIndex)
        }
        fileName = new Date().getTime() + '-' + fileName
        if (fileName.indexOf('.jpg') === -1 && fileName.indexOf('.png') === -1 && fileName.indexOf('.gif') === -1) {
            fileName += '.jpg'
        }
        if (num >= totalNum) {
            urlArray = []
            allUrlArray = []
            return
        }
        res.on('end', function() {
            fs.writeFile(targetFile + '/' + fileName, imgData, 'binary', function(err) {
                if (err) {
                    console.log(err)
                    return false
                }
                console.log(chalk.green(`${num}'-download success ${fileName}`))
                num++
            })
        })
    })
}

function callback(html, url) {
  var $ = cheerio.load(html)
  $('a').each(function(index, element) {
    var href = $(element).attr('href')
    if (/^http/.test(href) && allUrlArray.indexOf(href) === -1) {
      urlArray.push(href)
      allUrlArray.push(href)
    }
    if (/^\//.test(href)) {
      href = url + href
      if (allUrlArray.indexOf(href) === -1) {
        urlArray.push(href)
        allUrlArray.push(href)
      }
    }
  })
  $('img').each(function(index, element) {
    var src = $(element).attr('src')
    if (/^http/.test(src)) {
      getImg(src, url)
    }
  })
  var nextUrl = urlArray.shift()
  if (nextUrl) {
    getHtml(nextUrl)
  } else {
    console.log(chalk.blue('Finished!'))
  }
}

function getProtocol (url) {
    const needHttps = /^https/.test(url)
    return needHttps ? https : http
}