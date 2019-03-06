const program = require('commander');
const inquirer = require('inquirer')

program
    .version('0.0.1', '-v, --version')
    .usage('---> Just For Fun')
    .description('Image Catcher And Puppeteer Test');

program
    .option('-u, --url <url>', 'set target url')
    .option('-d, --dist [dist]', 'set saving dirrctory', 'F://images')
    .option('-n, --num [num]', 'set max image num', 100)


// program
//     .command('globalUrl')
//     .description('set global url')
//     .option('--t [t]', 'call times', 10)
//     .alias('gu')
//     .action(function (option) {
//       console.log(option.t);
//     });

program.parse(process.argv);
