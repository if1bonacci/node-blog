import makeChat from '../services/ChatService'
import { Server } from 'socket.io'

export default function(port: number, appServer: any) {
  const io = new Server(port, {
    cors: {
      origin: '*',
    }
  })
  io.listen(appServer)

  //inject
  makeChat(io);

  console.log(`WSS running on port ${port}`)

  return io;
}
