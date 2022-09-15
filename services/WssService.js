import { Server } from 'socket.io'

class WssService {
  constructor(port, server) {
    this.io = new Server(port, {cors: {
        origin: '*',
      }}).listen(server)
    this.users = {}
  }
  run() {
    this.io.on('connection', (socket) => {
      socket.on('new-user', name => {
        this.users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
      })
      socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: this.users[socket.id]})
      })
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', {message: `${this.users[socket.id]} disconnected`, name: 'info'})
        delete this.users[socket.id]
      })
    });
  }
}

export default WssService
