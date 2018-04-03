#!/usr/bin/env node
'use strict';
var fs = require('fs');
function copy(src, dst) {
    // console.log(process.argv)
    console.log(fs.readFileSync(src))
    fs.writeFileSync(dst, fs.readFileSync(src));//算是浅拷贝？ 简单的文件写到另一个文件
    fs.rename(dst, '../test2/world.js', (err) => {
        if (err) throw err;
        fs.stat('../test2/world.js', (err, stats) => {
            if (err) throw err;
            // console.log(`文件属性: ${JSON.stringify(stats)}`);
            // console.log(stats.isFile())
        });
    });
}
function main(argv) {
    copy(argv[0], argv[1]);
    writeNew();
}
function writeNew(params) {
    fs.writeFile('../test2/text.txt', '写入到一个新的文件中，如果没有这个文件则创建一个', 'utf-8', function (err) {
        if (err)
            console.log('写入失败')
    })
    fs.readdir('../test2', function (err, files) {//读文件夹
        console.log(files)  //输出：[ 'admin.js', 'user.js' ]
    })
}

main(process.argv.slice(2));

