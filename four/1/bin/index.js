#!/usr/bin/env node
'use strict';

var http = require('http');
var url = require('url');
http.createServer(function (request, response) {
    var body = [];

    console.log(request.method);
    console.log(request.headers);
    
    var tmp = request.url; // 解析URL、生成URL，以及拼接URL
    url.parse(tmp);
    console.log(url.parse(tmp));

    request.on('data', function (chunk) {
        body.push(chunk);
    });

    request.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
    response.end('Hello World\n');
}).listen(8124);
