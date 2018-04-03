var cat = require('./cat')
var echo = require('./node-echo')

echo()
var arguments = process.argv.splice(2);
console.log(arguments)
