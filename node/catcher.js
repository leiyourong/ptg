const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

const defaultProt = 'https://';
const protReg = /http(s)?\:\/\//;
const oldCatcher = require('./oldCatcher')

module.exports = async ({url, dist, num = 100}) => {
    if (!url) {
        console.log(chalk.red('url为空，退出！'));
        process.exit(0);
    }
    if (!protReg.test(url)) {
        url = defaultProt + url;
        console.log(chalk.green('为添加https的协议'));
    }
    await checkDirectory(dist);
    await catcher(url, dist, num);
}

async function checkDirectory(dist) {
    return new Promise((resolve, reject) => {
        const existDir = fs.existsSync(dist);
        if (existDir) {
            fs.readdir(dist, (err, files) => {
                if (files.length > 0) {
                    console.log(chalk.red(`'${dist}' directory exists!`));
                    const exampleFile = files.slice(0, 5).map(file => `${dist}${file.indexOf('/') !== -1 ? file : `/${file}`}`).join(',');
                    console.log(chalk.red(`includes files such as ${exampleFile} ...`));
                    inquirer.prompt([{
                        type: 'list',
                        name: 'clean',
                        message: 'need to clean target directory ?',
                        choices: [{
                            name: 'false',
                            value: false
                        }, {
                            name: 'true',
                            value: true
                        }]
                    }]).then(data => {
                        if (data.clean) {
                            files.forEach(file => {
                                const fullPath = dist + (file.indexOf('/') !== -1 ? file : '/' + file);
                                fs.unlink(fullPath, err => {
                                    if (!err) {
                                        console.log(chalk.green(`file ${fullPath} has been deleted!`));
                                    }
                                })
                            });
                        }
                        resolve();
                    });
                } else {
                    resolve();
                }
            })
        } else {
            fs.mkdir(dist, () => {
                console.log(chalk.green(`directory ${dist} created!`));
                resolve();
            });
        }
    })
}

async function catcher(url, dist, num) {
    inquirer.prompt([{
        type: 'list',
        name: 'view',
        message: 'need to view how it catches ?',
        choices: [{
            name: 'false',
            value: false
        }, {
            name: 'true',
            value: true
        }]
    }]).then(data => {
        if (data.view) {
            oldCatcher(url, dist, num)
        } else {
            // puppeteerCatcher(url, dist, num)
        }
        resolve();
    });
    
}