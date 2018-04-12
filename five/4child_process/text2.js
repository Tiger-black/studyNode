process.on('message', function (msg) {
    msg.hello = msg.hello.toUpperCase();
    console.log(msg)
    console.log(`我接收的是 ${msg.hello}`)
    process.send('我返回的aaa');
    process.exit(0);
});