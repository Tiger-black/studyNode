var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.write('hello lixiaohu')
	res.end()
}).listen(1234)