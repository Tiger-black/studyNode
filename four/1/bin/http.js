var http = require('http');
var https = require('https');

// var options = {
//     hostname: 'www.xiaqiu.cn',
//     port: 80,
//     path: '/upload',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// };

// var request = http.request(options, function (response) { 
//     var body = [];

//     console.log(response.statusCode);
//     console.log(response.headers);

//     response.on('data', function (chunk) {
//         body.push(chunk);
//     });

//     response.on('end', function () {
//         body = Buffer.concat(body);
//         console.log(body.toString());
//     });
// });
// request.write('Hello World');
// request.end();

var options = {
    hostname: 'www.xiaqiu.cn',
    port: 443,
    path: '/',
    method: 'GET'
};
var request = https.request(options, function (response) {
    var body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
 });

request.end();
