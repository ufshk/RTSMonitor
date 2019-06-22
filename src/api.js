import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8000')

function clientHandler(setNumOfClients) {
    socket.on('clients', numOfClients => setNumOfClients(numOfClients))
    socket.emit('clients')
}

function messageHandler(addMessage) {
    socket.on('message', msg => addMessage(msg))
}

function sendMessage(msg) {
    socket.emit('message', msg)
}

export { messageHandler, sendMessage, clientHandler }