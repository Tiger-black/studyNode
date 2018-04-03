#!/usr/bin/env node
'use strict';
var fs = require('fs');
function main(argv) {
    removeDir('../empty');//删除文件夹
}
function removeDir(path) {
    fs.rmdir(path, function (err) {
        // if (err){
        //     console.log(`删除失败 文件夹内非空:${err} 尝试先删除文件`);

        // }
        var files = fs.readdirSync(path);
        for (var i = 0; i < files.length; i++) {
            var pathf = path + '/' + files[i];//拼接子文件路径
            console.log(pathf)
            var stats = fs.statSync(pathf)
            console.log(stats.isFile())

            if (stats.isFile()) {
                fs.unlinkSync(pathf);     //若为文件则删除
            } else {
                removeDir(pathf)
                console.log(2)
            }
        };
        fs.rmdirSync(path);
    })
}

main(process.argv.slice(2));

