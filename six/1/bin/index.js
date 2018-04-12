#!/usr/bin/env node
'use strict';
var http = require('http')
var domain = require('domain')

function asyncA(request, callback) {
    setTimeout(function () {
        callback(aaa, request);
    }, 0);
}
function asyncB(request, callback) {
    setTimeout(function () {
        callback(null, request);
    }, 0);
}
function asyncC(request, callback) {
    setTimeout(function () {
        callback(null, {a:1});
    }, 0);
}

// function async(request, callback) {
//     // Do something.
//     asyncA(request, function (err, data) {
//         if (err) {
//             callback(err);
//         } else {
//             // Do something
//             asyncB(request, function (err, data) {
//                 if (err) {
//                     callback(err);
//                 } else {
//                     // Do something
//                     asyncC(request, function (err, data) {
//                         // console.log(data)
//                         if (err) {
//                             callback(err);
//                         } else {
//                             // Do something
//                             callback(null, data);
//                         }
//                     });
//                 }
//             });
//         }
//     });
// }

// http.createServer(function (request, response) {
//     async(request, function (err, data) {
//         if (err) {
//             response.writeHead(500);
//             response.end();
//         } else {
//             response.writeHead(200);
//             response.end('hello');
//         }
//     });
// }).listen(8080);


function async(request, callback) {
    // Do something.
    asyncA(request, function (data) {
        // Do something
        asyncB(request, function (data) {
            // Do something
            asyncC(request, function (data) {
                // Do something
                callback(data);
            });
        });
    });
}


http.createServer(function (request, response) {
    var d = domain.create();

    d.on('error', function (error) {
        console.log(error)
        response.writeHead(500);
        response.end('505');
    });

    d.run(function () {
        async(request, function (data) {
            response.writeHead(200);
            response.end('hello');
        });
    });
}).listen(8080);