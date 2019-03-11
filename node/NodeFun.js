const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const catcher = require('./catcher')
console.log(catcher)
program
    .version('0.0.1', '-v, --version')
    .usage('---> Just For Fun')
    .description('Image Catcher And Puppeteer Test');

program
    .option('-u, --url <url>', 'set target url')
    .option('-d, --dist <dist>', 'set saving dirrctory')
    .option('-n, --num [num]', 'set max image num', 100)

program.parse(process.argv);

const {url, dist, num} = program;

if (url && dist && num) {
    catcher({
        url,
        dist,
        num
    })
} else {
    inquirer.prompt([{
        type: 'input',
        name: 'url',
        message: chalk.blue('input target url?'),
        prefix: 'lalala: '
    }, {
        type: 'input',
        name: 'dist',
        message: 'input target directory ? ',
        suffix: chalk.red.bold('don\'t lie me'),
        default: 'F://images'
    }, {
        type: 'input',
        name: 'num',
        message: 'input max num ?',
        default: 100,
        validate: value => {
            return value ? (/\d{1,4}/.test(value) || chalk.bgRed.bold('please input a number between 1 and 9999 !')) : true;
        }
    }]).then(data => {
        catcher(data)
    });
}

// type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；
// name: 存储当前问题回答的变量；
// message：问题的描述；
// default：默认值；
// choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)； 字符串/对象{name, value}
// validate：对用户的回答进行校验；
// filter：对用户的回答进行过滤处理，返回处理后的值；
// transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
// when：根据前面问题的回答，判断当前问题是否需要被回答；
// pageSize：修改某些type类型下的渲染行数；
// prefix：修改message默认前缀；
// suffix：修改message默认后缀。