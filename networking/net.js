const server = require('net').createServer()
let counter = 0
let sockets = {}

const timestamp = () => {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes()}`
}

server.on('connection', socket => {
  socket.id = counter++
  
  console.log('Client connected')
  socket.write('Please type your name: ')
  
  socket.on('data', data => {
    if(!sockets[socket.id]) {
      socket.name = data.toString().trim()
      socket.write(`Welcome ${socket.name}!\n`)
      sockets[socket.id] = socket
      return
    }
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      if (socket.id == key) return
      clientSocket.write(`${socket.name} [${timestamp()}]: `)
      clientSocket.write(data)
    })
  })

  socket.on('end', () => {
    delete sockets[socket.id]
    console.log('Client disconnected')
  })
  // socket.setEncoding('utf8') //sets all encoding to utf8 (data comes as buffer by default)
})

server.listen(8000, () => console.log('Server bound'))
