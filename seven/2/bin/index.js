var fs = require('fs'),
    path = require('path'),
    http = require('http');

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};



function main(argv) {
    console.log(fs.readFileSync(argv[0]).toString())
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 80;
        
    http.createServer(function (request, response) {
        var urlInfo = parseURL(root, request.url);
        console.log(urlInfo)
    
        validateFiles(urlInfo.pathnames, function (err, pathnames) {//检测是不是一个文件
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, response);//依次响应
            }
        });
    }).listen(port);
}

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            var reader = fs.createReadStream(pathnames[i]);
            
            reader.pipe(writer, { end: false });//{ end: false } 不写第二个参数option时  默认为true 这样只要流写完就关闭通道，我们这里需要依次写入 所有不关闭通道
            reader.on('end', function () {
                next(i + 1, len);
            });
        } else {
            writer.end();//这时才关闭通道
        }
    }(0, pathnames.length));
}

function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function (err, stats) {
                if (err) {
                    callback(err);
                } else if (!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, pathnames);
        }
    }(0, pathnames.length));
}

function parseURL(root, url) {

    var base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    // console.log(parts)
    base = parts[0];
    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value);
    });

    // console.log(pathnames)
    // console.log(path.extname(pathnames[0]))


    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

main(process.argv.slice(2));

// $ node bin / index.js./ config.json