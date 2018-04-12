#!/usr/bin/env node

var argv = require('yargs')
    .option('n', {
        alias: 'name',
        demand: true,
        default: 'tom',
        describe: 'your name',
        type: 'string'
    })
    .option('b', {//短名
        alias: 'bid',//全名
        demand: false,//是否必填
        default: 'xiaohu',//默认值
        describe: '这是bid',//描述
        type: 'string'//类型
    })
    .usage('Usage: yargs [options]')//用法格式
    .example('yargs -n tom', 'say hello to Tom')
    .example('yargs -b bid', 'say hello to bid')//-h 里提示例子
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015 xiaohu.li')//出现在帮助信息的结尾
    .argv;

    
console.log('hello ', argv.n);
console.log('hello ', argv);

console.log('\x1B[36m%s\x1B[0m', '打印非连词线开头的参数:[' + argv._ + ']');
