#!/usr/bin/env node
'use strict';
var fs = require('fs');
var zlib = require('zlib')  //引入压缩模块 
fs.createReadStream('./test.js')     //读取test文件并压缩创建为test.gz文件；
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('./test.gz'))

