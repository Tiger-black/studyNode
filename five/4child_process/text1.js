
console.log(111)
console.log(222)
console.log(333)
console.log(444)
console.log(555)

console.log(22222)
console.log(22222)
console.log(22222)
console.log(22222)
console.log(22222)


process.on('SIGTERM', function () {
    // cleanUp();
    console.log(1)
    process.exit(0);
});

