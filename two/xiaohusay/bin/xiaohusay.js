#!/usr/bin/env node

var fs = require("fs"),
    path = process.cwd();

var run= function (obj) {

    console.log('命令行后面的参数数组' + JSON.stringify(obj));
    console.log('\x1B[33m%s\x1b[0m:', '当前文件路径' + path);


    console.log('\x1B[36m%s\x1B[0m', '打印当前目录:');
    if(obj[0] === '-v'){
        console.log('version is 1.0.0');
    }else if(obj[0] === '-h'){
        console.log('Useage:');
        console.log('  -v --version [show version]');
    }else{
        fs.readdir(path, function(err, files){
            if(err){
                return console.log(err);
            }
            for(var i = 0; i < files.length; i += 1){
                console.log('\x1B[36m%s\x1B[0m', files[i]); 
            }
        });
    }
};
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2));