问题
一 for循环+异步操作
    一个很经典的问题就是在循环中遇到回调函数：
    var fs = require('fs');
    var files = ['a.txt','b.txt','c.txt'];

    for(var i=0; i < files.length; i++) {
        fs.readFile(files[i], 'utf-8', function(err, contents) {
            console.log(files[i] + ': ' + contents);
        });
    }
    假设这三个文件的内容分别为：AAA、BBB、CCC，我们期望的结果是:
    a.txt: AAA
    b.txt: BBB
    c.txt: CCC

    而实际的结果却是：
    undefined: AAA
    undefined: BBB
    undefined: CCC
    这是为什么呢？如果我们在循环内部把i的值打印出来，可以看出，三次输出的数据都是3，也就是files.length的值。
    也就是说，fs.readFile的回调函数中访问到的i值都是循环结束后的值，因此files[i]的值为undefined。
    解决此问题有很多方法，这里利用js函数编程的特性，建立一个闭包来保存每次需要的i值：

    for(var i=0; i < files.length; i++) {
        （function(i) {
            fs.readFile(files[i], 'utf-8', function(err, contents) {
                console.log(files[i] + ': ' + contents);
            });
        })(i);
    }
    由于运行时闭包的存在，该匿名函数中定义的变量（包括参数表）在它内部的函数（fs.readFile 的回调函数）执行完毕之前都不会释放，因此我们在其中访问到的 i 就分别是不同的闭包实例，这个实例是在循环体执行的过程中创建的，保留了不同的值。这里使用闭包是为了更清楚的看到上面输出undefined的原因，
    其实，还可以有更简单的方法：
    files.forEach(function(filename) {
        fs.readFile(filename, 'utf-8', function(err, contents) {
            console.log(filename + ': ' + contents);
        });
    });