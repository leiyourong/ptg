const puppeteer = require('puppeteer');
let currentPage = {};
let renderedPageUrls = [];

module.exports = async (url, dist, num) => {
    const browser = await puppeteer.launch({headless: false});
    currentPage = await browser.newPage()
    getPage(url, dist, num)
}

async function getPage(url, dist, num) {
    if (renderedPageUrls.indexOf(url) !== -1) {
        return;
    }
    renderedPageUrls.push(url);
    await currentPage.goto(url);
    await currentPage.screenshot({path: `${dist}/${getShortUrlName(url)}`});
    await currentPage.evaluate(() => {
        catchImage(document, dist, num);
    })
    await browser.close();
}

function getShortUrlName(url) {
    return url.replace(/http(s)?\:\/\//, '');
}

function catchImage(document, dist, num) {
    document.querySelectorAll('a[href]');
}