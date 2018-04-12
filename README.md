一、fx 文件系统

    1、基本概念
        文件 I/O 是对标准 POSIX 函数的简单封装。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。

        异步方法的最后一个参数都是一个回调函数。 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。 如果操作成功完成，则第一个参数会是 null 或 undefined。

        当使用同步方法时，任何异常都会被立即抛出。 可以使用 try/catch 来处理异常，或让异常向上冒泡。
        在繁忙的进程中，建议使用异步的方法。 同步的方法会阻塞整个进程，直到完成（停止所有连接）。
        可以使用文件名的相对路径。 路径是相对 process.cwd() 的。
        大多数 fs 函数可以省略回调函数，在这种情况下，会使用默认的回调函数。 若要追踪最初的调用点，可设置 NODE_DEBUG 环境变量：
        注意：不建议省略异步方法的回调函数，未来的版本可能会导致抛出错误。
        $ cat script.js
        function bad() {
            require('fs').readFile('/');
        }
        bad();

        $ env NODE_DEBUG=fs node script.js
        fs.js:88
                throw backtrace;
                ^
        Error: EISDIR: illegal operation on a directory, read
            <stack trace.>


    2、Buffer
        在电脑中，所有的数据都是以二进制的形式存储的，而JavaScript语言本身是没有二进制数据类型的，而Node作为服务端需要处理像TCP网络流和文件流时的数据，就必须得使用二进制，因此在Nodejs中，定义了一个buffer类，用来创建一个专门存放二进制数据的缓存区
        （1）创建buffer
            var buf1=new Buffer(10)——这里的10代表字节数
            var buf2=new Buffer([1,2,3])——这里表示创建一个存数组的buffer数据
            var buf3=new Buffer('string....','utf-8')——这里表示存放一个字符串
        （2）写入buffer内容
            将一个buffer类型的数据写入到另一个buffer类型的数据中，进行整合；
            语法:buf.write(string,offset,length,encoding)
                参数:
                string:代表写入的内容
                offset:代表开始写入的索引值 
                length:代表写入的字节数
                encoding:代表编码格式，一般默认为utf-8;    
            var buf1=new Buffer('aabbcc')
            var buf2=new Buffer('ddee')
                //将buf2的内容写入到buf1中
            buf1.write(buf2.toString(),2,4,'utf8')
            console.log(buf1.toString())
        （3）读取buffer
            通过tostring()方法将buffer类型数据转换为字符串
            buf.toString(encodeing,[start,[end)
                enconding:编码格式
                start:起始位置          
                end:结束位置
        （4）拷贝buffer
            将一个buffer数据复制到另一个buffer中
            buf.copy(targetBuffer,targetstart,sourcestart,sourceend)
                参数:
                targetBuffer:目标buffer，拷贝到的对象
                targetstart:拷贝的起始位置
                sourcestart:拷贝的内容从哪儿开始
                sourceend:拷贝的内容到哪儿结束
            var buf1=new Buffer('aabbcc')
            var buf2=new Buffer('ddeeff')
            buf1.copy(buf2,0,2,6)
            console.log(buf2.toString()) 

    3、fs文件模块
        fs模块是一个很重要的模块，也支持非常多的属性和方法，可以直接在nodejs中查看，fs模块支持的属性，创建一个app.js文件，输入以下代码，运行即可。
        var fs = require("fs"), i; 
        for(i in fs){ 
            console.log(i); 
        } 
        底层 open和openSync方法
        对于文件操作，最基本的莫过于打开文件，你想要读写文件，那么就必须要打开文件才能读写，就像你要往冰箱放东西或者从冰箱拿东西，那么你首先要打开冰箱才行。

        （1）文件读取
            同步读取 fs.readFileSync(path,options)
            异步读取 fs.readFile(path,options,callback)
            参数: 
            path:为要读取的文件的路径， 
            options:其他选项，如utf-8编码； 
            callback:回调函数，有两个参数，err:默认为null，当文件读取失败时它会存储一些错误信息并返回，所以可以通过err来判断文件是否读取成功； data:当文件读取成功时，文件中的数据就存储在data中。    //引入文件模块 
            fs.readFile('./dong.html','utf-8',function(err,data){   //异步读取
                if(!err){
                    console.log(data)   //当文件读取成功时，输出读取的内容
                }
            })
        （2）文件信息 
            fs.stat(path,callback);
            参数: 
            path为文件的路径 
            callback:回调函数 ，有两个参数，err:在获取文件信息失败时，会存储错误信息，stats:存储文件信息的参数。
            stats:是fs.stats()对象，执行fs.stat后将stats类实例返回给其回调函数 ，因此可以通过stats对象上的isFile()方法来判断读取的是否为文件（而不是文件夹）
        （3）写文件
            同步写入 fs.writeFileSync(filename,data,[options]) 
            异步写入 fs.writeFile(filename,data,[options],callback); 
            参数: 
            filename:待写入的文件名，若没有则会自动创建相应的文件 
            data:写入的数据 
            options:其他选项，如utf-8 
            callback:回调函数，只有一个参数err，当写入失败时err包含了错误信息
            fs.writeFile('./text.txt','写入到一个新的文件中','utf-8',function(err){
                if(err)
                    console.log('写入失败')
            })
        （4）删除文件
            异步删除 fs.unlink(path,callback) 
            参数:path——文件路径；callback:回调函数，有一个参数err，当删除失败时会存放错误信息 
            fs.unlink('./text',function(err){
                if(err)
                    console.log(err)
            })
        （5）fs读取文件夹目录
            fs.readdir(path，callback) readdir()方法可以读取文件夹的目录，即文件夹下有多少文件等
            参数： 
            path：文件夹路径 
            callback：回调函数，有两个参数：err——读取失败时的错误信息，files——读取成功时的文件的集合，是一个数组
            fs.readdir('./Router',function(err,files){
                console.log(files)  //输出：[ 'admin.js', 'user.js' ]
            })
        （6）fs删除空文件夹
            fs.rmdir(path，callback) 
            注意：只有空文件夹才能被删除，若文件夹不为空，则会报错 directory not empty
            【实例】删除一个不为空的文件夹
            分析： 要删除文件夹用rmdir()方法，但前提是文件夹为空，所以要先删除子文件，而子文件中又有文件夹所以要对子文件进行判断isFile()，若是文件就直接删除unlink，若是文件夹则进入到文件夹中删除子文件再删除文件夹。
            
