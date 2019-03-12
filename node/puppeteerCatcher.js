const puppeteer = require('puppeteer');
const chalk = require('chalk');
let currentPage = {};
let renderedPageUrls = [];
let browser

module.exports = async (url, dist, num) => {
    browser = await puppeteer.launch({headless: false});
    currentPage = await browser.newPage()
    getPage(url, dist, num)
}

async function getPage(url, dist, num) {
    if (renderedPageUrls.indexOf(url) !== -1) {
        return;
    }
    renderedPageUrls.push(url);
    await currentPage.goto(url);
    await currentPage.screenshot({path: `${dist}/${getShortUrlName(url)}.jpg`});
    console.log(chalk.green('take a screenshot url of ' + url));
    await currentPage.evaluate(() => {
        const links = document.querySelectorAll('a[href]');
        console.log(links.length);
    })
    await browser.close();
}

function getShortUrlName(url) {
    return url.replace(/http(s)?\:\/\//, '');
}