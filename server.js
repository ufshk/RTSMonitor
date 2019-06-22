const io = require('socket.io')()
io.on('connection', socket => {
    console.log('Connected')
    socket.on('clients', () => {
        setInterval(() => {
            io.emit('clients', Object.keys(io.sockets.sockets).length)
        }, 1000);
    })

    socket.on('message', msg => {
        console.log('Client sent message', msg)
        io.emit('message', msg)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

const port = 8000
io.listen(port)
console.log('Listening on port:', port)