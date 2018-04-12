#!/usr/bin/env node
'use strict';


var child_process = require('child_process');
var util = require('util');

function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s/* %s', source, target), callback);
}

copy('./text1', './text2/text2.txt', function (err,rs) {
    process.send({ //4child_process 里接收广播
        code:1,
        msg:'我返回的aaa'
    });    
});
