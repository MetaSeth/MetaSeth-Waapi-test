// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import { app, scheduler } from './main';

// const server = http.createServer(app);
// const io = new SocketIOServer(server, { cors: { origin: '*' } });
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   socket.on('add_action', (action) => {
//     try {
//       scheduler.addAction(action);
//       // io.emit('action_added', {
//       //   success: true,
//       //   queue: scheduler.getCreditsAndQueue().queue,
//       // });
//       io.emit('queue_updated', scheduler.getCreditsAndQueue());
//       console.log('queue_updated:', action.type);
//       console.log('CreditsAndQueue:', scheduler.getCreditsAndQueue());
      
//     } catch (error) {
//       socket.emit('action_error', { success: false, message: error.message });
//     }
//   });
// });

// const port = process.env.PORT || 3000;

// server.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// export {io};
