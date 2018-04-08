#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');

// function travel(dir, callback) { //同步遍历
//     fs.readdirSync(dir).forEach(function (file) {
//         var pathname = path.join(dir, file);
//         // console.log(pathname)
        
//         if (fs.statSync(pathname).isDirectory()) {
//             travel(pathname, callback);
//         } else {
//             callback(pathname);
//         }
//     });
// }

// travel(path.normalize('../'), function (params) {
//     console.log(params)
// })

function travel(dir, callback, finish) { //异步遍历  ???? 不明白
    fs.readdir(dir, function (err, files) {
        (function next(i) {
            if (i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function (err, stats) {
                    if (stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
}
travel("../", function (pathname, func) {
    console.log(pathname);
    func();
}, function () {
    console.log("遍历完成");
});
