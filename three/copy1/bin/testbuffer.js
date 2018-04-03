var buf1 = new Buffer('aabbcc')
var buf2 = new Buffer('ddeeff')
buf1.copy(buf2, 0, 2, 6)
console.log(buf2.toString()) 