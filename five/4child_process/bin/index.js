var child_process = require('child_process')

// var child = child_process.spawn('node', ['text1.js']);


// child.stdout.on('data', function (data) {
//     console.log('stdout: ' + data);
// });

// child.stderr.on('data', function (data) {
//     console.log('stderr: ' + data);
// });

// child.on('close', function (code) {
//     console.log('child process exited with code ' + code);
// });
//--------------------------------------------------------------------------------

// child.kill('SIGTERM');

//--------------------------------------------------------------------------------

// var child = child_process.spawn('node', ['text2.js'], {
//     stdio: [0, 1, 2, 'ipc']
// });

// child.send({ hello: 'hello' });

// child.on('message', function (msg) {
//     console.log(msg);
// });
//--------------------------------------------------------------------------------

var child = child_process.spawn('node', ['../1cp/bin/index.js'], {
    stdio: [0, 1, 2, 'ipc']
});

child.on('message', function (msg) {
    if (msg.code = 1){
        console.log(`拷贝任务完成:${msg.msg}`);
    }
});