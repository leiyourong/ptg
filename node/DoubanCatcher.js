const puppeteer = require('puppeteer');
const fs = require('fs')
const chalk = require('chalk')
const xlsx = require('node-xlsx');

let browser
// 要爬的douban链接
const urls = [
  'https://www.douban.com/group/zufan',
  'https://www.douban.com/group/changningzufan',
  'https://www.douban.com/group/shanghaizufang',
  'https://www.douban.com/group/shzf',
  'https://www.douban.com/group/583132',
  'https://www.douban.com/group/637731',
  'https://www.douban.com/group/557646',
  'https://www.douban.com/group/SHwoman',
  'https://www.douban.com/group/633599',
  'https://www.douban.com/group/wujieshidai',
  'https://www.douban.com/group/549538',
  'https://www.douban.com/group/zufangshanghai',
  'https://www.douban.com/group/499320',
  'https://www.douban.com/group/491675',
  'https://www.douban.com/group/lsg',
]
let allInfos = []
let ignoreLinks = []
let previousData = []
// 存放的目录
const dir = 'D://house'
// 关键字
const keywords = ['娄山关', '天山二村', '天山四村', '天山五村', '大金更', '遵义路', '天山路', '拼多多', '金虹桥']
// 期望价格区间
const prices = [3500, 4800]
const showNonPrice = true

async function checkDirectory() {
  return new Promise((resolve, reject) => {
    const existDir = fs.existsSync(dir);
    if (!existDir) {
      fs.mkdir(dir, () => {
        console.log(chalk.green(`directory ${dir} created!`));
        resolve();
      })
    } else {
      resolve();
    }
  })
}

async function writeToFile() {
  await checkDirectory()
  const date = new Date()
  const buffer = xlsx.build([...previousData, {
    name: `${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
    data: allInfos
  }]);
  fs.writeFile(`${dir}/house.xlsx`, buffer, function(err) {
    if (err) {
        console.log(err)
        return false
    }
    process.exit(0)
  })
}

function getDiscussionUrl (url) {
  return url.includes('/discussion') ? url : `${url}/discussion`
}

async function analyzePage (url) {
  const page = await browser.newPage();
  try {
    await page.goto(url);
  } catch (error) {
    console.log(chalk.red(error));
  }
  
  const allItems = await page.evaluate(({ keywords, prices, showNonPrice, ignoreLinks }) => {
    const allItems = document.querySelectorAll('.article table tr')
    const result = []
    allItems.forEach(item => {
      const itemBlock = item.querySelector('.title a')
      const dateBlock = item.querySelector('.time')
      if (itemBlock && dateBlock) {
        const title = itemBlock.getAttribute('title')
        const url = itemBlock.getAttribute('href')
        const dateStr = dateBlock.innerText
        const matchKeyword = keywords.some(keyword => title.includes(keyword))

        const matchedPrice = title.match(/(?<!\d)\d{4}(?!\d)/)
        const price = Number(matchedPrice && matchedPrice[0])
        const matchPrice = price > prices[0] && price < prices[1] || (showNonPrice ? price === 0 : false)
        if (!matchKeyword || ignoreLinks.includes(url) || !matchPrice) {
          return
        }

        const dateTime = new Date(`2020-${dateStr}`).getTime()
        if (!isNaN(dateTime) && Date.now() - dateTime <= 1000 * 60 * 60 * 24 * 30) {
          result.push([title, url, price, dateStr])
        }
      }
    })

    return result
  }, { keywords, prices, showNonPrice, ignoreLinks })
  allInfos = allInfos.concat(allItems)

  await page.close()
}

function getPreviousData() {
  const filePath = `${dir}/house.xlsx`
  const isExistFile = fs.existsSync(filePath)
  if (!isExistFile) {
    return []
  }

  return xlsx.parse(filePath) || []
}
async function getIgnoreLink () {
  previousData = getPreviousData()
  ignoreLinks = previousData.reduce((items, item) => {
    const links = item.data.map(row => row[1])
    return items.concat(links)
  }, [])
}

async function start() {
  getIgnoreLink()
  browser = await puppeteer.launch({headless: false});
  for (let index = 0; index < urls.length; index++) {
    const url = getDiscussionUrl(urls[index])
    await Promise.all(Array(10).fill(0).map((value, index) => analyzePage(`${url}?start=${index * 25}`)))
  }

  if (allInfos.length === 0) {
    console.log('没有新的帖子了')
  } else {
    console.log(`共有 ${allInfos.length} 条新的帖子符合要求`)
    writeToFile(allInfos)
  }
}

start()

