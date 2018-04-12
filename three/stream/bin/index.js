#!/usr/bin/env node
'use strict';
var fs = require('fs');
var zlib = require('zlib')  //引入压缩模块 
fs.createReadStream('./test.js')     //读取test文件并压缩创建为test.gz文件；
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('./test.gz'))

var rs = fs.createReadStream('./test.js');
var ws = fs.createWriteStream('./test2.js');

rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {
        console.log('执行不过来了暂停一下')
        rs.pause();
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});