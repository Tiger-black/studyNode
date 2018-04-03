#!/usr/bin/env node

require('shelljs/global');
var argv = require('yargs')
    .command("morning", "good morning", function (yargs) {
        echo("Good Morning");
        var argv = yargs.reset()
            .option("m", {
                alias: "message",
                description: "provide any sentence"
            })
            .help("h")
            .alias("h", "help")
            .argv;

        echo(argv.m);
    })
    .argv;




console.log('\x1B[36m%s\x1B[0m', '打印非连词线开头的参数:[' + argv._ + ']');
