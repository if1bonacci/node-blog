import {Server} from 'socket.io'

export default function (io: Server) {
  const users: Record<string, string> = {}

  io.on('connection', (socket) => {
    socket.on('new-user', (name: string) => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', (message: string) => {
      socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', {message: `${users[socket.id]} disconnected`, name: 'info'})
      delete users[socket.id]
    })
  });

  return io;
}
