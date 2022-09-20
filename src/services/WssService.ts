import { Server } from 'socket.io'

export default class WssService {
  private users: Object = {}
  private wss: Server

  constructor(port: number, server: any) {
    this.wss = new Server(port, {
      cors: {
        origin: '*',
      }
    }).listen(server)
    console.log(`WSS running on port ${port}`)
  }
  run() {
    this.wss.on('connection', (socket) => {
      socket.on('new-user', name => {
        this.users[socket.id as keyof typeof this.users] = name
        socket.broadcast.emit('user-connected', name)
      })
      socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: this.users[socket.id as keyof typeof this.users]})
      })
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', {message: `${this.users[socket.id as keyof typeof this.users]} disconnected`, name: 'info'})
        delete this.users[socket.id as keyof typeof this.users]
      })
    });
  }
}
