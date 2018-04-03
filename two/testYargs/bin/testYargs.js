#!/usr/bin/env node

var argv = require('yargs')
    .option('n', {
        alias: 'name',
        demand: true,
        default: 'tom',
        describe: 'your name',
        type: 'string'
    })
    .usage('Usage: yargs [options]')
    .example('yargs -n tom', 'say hello to Tom')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015 xiaohu.li')
    .argv;

    
console.log('hello ', argv.n);

console.log('\x1B[36m%s\x1B[0m', '打印非连词线开头的参数:[' + argv._ + ']');
