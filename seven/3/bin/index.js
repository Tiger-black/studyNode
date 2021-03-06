// var child_process = require('child_process');
// function spawn(mainModule) {
//     var worker = child_process.spawn('node', ['./server.js',mainModule]);

//     worker.on('exit', function (code) {
//         if (code !== 0) {
//             spawn(mainModule);
//         }
//     });
// }
    
// spawn(process.argv.slice(2));


var cp = require('child_process');

var worker;

function spawn(server, config) {
    worker = cp.spawn('node', [server, config]);
    worker.on('exit', function (code) {
        if (code !== 0) {
            spawn(server, config);
        }
    });
    worker.stdout.on('data', (data) => {
        console.log(`输出：${data}`);
    });
    worker.stderr.on('data', (data) => {
        console.log(`错误：${data}`);
    });

    worker.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
    });
}

function main(argv) {
    spawn('./server.js', argv[0]);
    process.on('SIGTERM', function () {
        console.log('你按了ctrl + C')
        worker.kill();
        process.exit(0);
    });
}

main(process.argv.slice(2));