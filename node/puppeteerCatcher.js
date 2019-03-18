const puppeteer = require('puppeteer');
const chalk = require('chalk');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
let currentPage = {};
let renderedPageUrls = [];
let unRenderedPageUrls = [];
let downloadImageList = [];
let browser;
let currentNum = 0;
let totalNum = 9999;
let outputDist;

module.exports = async (url, dist, num) => {
    browser = await puppeteer.launch({headless: false});
    currentPage = await browser.newPage();
    outputDist = dist;
    totalNum = num;
    getPage(url);
}

async function getPage(url) {
    if (renderedPageUrls.indexOf(url) !== -1) {
        return;
    }
    renderedPageUrls.push(url);
    try {
        await currentPage.goto(url);
    } catch (error) {
        console.log(chalk.red(error));
        return goToNextPage();
    }
    
    // await currentPage.screenshot({path: `${outputDist}/${getShortUrlName(url)}.jpg`});
    // console.log(chalk.green('take a screenshot url of ' + url));
    const {links, images} = await currentPage.evaluate(url => {
        const getTargetUrl = (selector, attr) => {
            const selectors = document.querySelectorAll(selector);
            const realSelectors = [];
            selectors.forEach(selector => {
                const value = selector[attr];
                realSelectors.push(value.charAt(0) === '/' ? (url + value) : value);
            });
            return realSelectors;
        }
        return {
            links: getTargetUrl('a[href]', 'href'),
            images: getTargetUrl('img', 'src'),
        }
    }, url)
    unRenderedPageUrls = links.reduce((urls, cur) => {
        urls.indexOf(cur) === -1 && urls.push(cur);
        return urls;
    }, unRenderedPageUrls);
    images.forEach((imgSrc, index) => {
        /^http/.test(imgSrc) && downloadImageList.indexOf(imgSrc) === -1 && downloadImg(imgSrc);
        // 不考虑下载失败的情况
        downloadImageList.push(imgSrc);
    })
    goToNextPage();
}

function getShortUrlName(url) {
    return url.replace(/http(s)?\:\/\//, '');
}

function downloadImg(src) {
    getProtocol(src).get(src, res => {
        let imgData = '';
        res.setEncoding('binary'); // 一定要设置 response 的编码为 binary 否则会下载下来的图片打不开
        res.on('data', function(chunk) {
            imgData += chunk;
        });
        let fileName = path.basename(src)
        fileName = getShortCutByStrs(fileName, ['?', '!'])
        fileName = Date.now() + '-' + fileName;
        fileName = getShortCutByStrs(fileName, ['.jpg', '.png', '.gif'], target => {
            target += '.jpg';
        })
        if (currentNum >= totalNum) {
            renderedPageUrls = [];
            unRenderedPageUrls = [];
            process.exit(0);
            return;
        }
        res.on('end', function() {
            const fullPath = outputDist + '/' + fileName;
            fs.writeFile(fullPath, imgData, 'binary', err => {
                if (err) {
                    console.log(err);
                    return false;
                }
                console.log(chalk.green(`${currentNum}-download success ${fileName}`));
                currentNum++;
            })
        })
    })
}

function getProtocol (url) {
    const needHttps = /^https/.test(url);
    return needHttps ? https : http;
}

function goToNextPage() {
    const nextUrl = unRenderedPageUrls.shift();
    if (nextUrl) {
        getPage(nextUrl);
    } else {
        console.log(chalk.blue('Finished!'));
        process.exit(0);
    }
}

function getShortCutByStrs(target, strArr, cb) {
    if (!Array.isArray(strArr)) {
        strArr = [strArr];
    }
    strArr = strArr.filter(str => target.indexOf(str) !== -1)
    const MAX_UNREACH_INDEX = 9999;
    const minIndex = strArr.reduce((prev, cur) => {
        let curIndex = target.indexOf(cur);
        if (cb) {
            curIndex += cur.length;
        }
        if (curIndex !== -1) {
            return curIndex < prev ? curIndex : prev;
        }
        return prev;
    }, MAX_UNREACH_INDEX);
    if (minIndex === MAX_UNREACH_INDEX && cb) {
        return cb(target);
    }
    return target.substr(0, minIndex);
}