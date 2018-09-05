process.on('SIGINT', function () {
    console.log('fff')
    setTimeout(function (){
        process.exit(0)
    }, 3000)
})

setTimeout(_ => {}, 1000000)