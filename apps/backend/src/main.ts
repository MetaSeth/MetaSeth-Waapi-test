import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server as SocketIOServer } from 'socket.io';
import { actionsRouter } from './api/actionsRouter';
import { CreditManager } from './lib/creditManager';
import { Scheduler } from './lib/scheduler';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up dependencies for scheduler
const creditConfig = { maxCredits: { A: 10, B: 10, C: 15 } };
const creditManager = new CreditManager(creditConfig);

const server = http.createServer(app);

const io = new SocketIOServer(server, { cors: { origin: '*' } });

// Initialize scheduler with Socket.IO
const scheduler = new Scheduler(creditManager, io);
scheduler.scheduleActions();

// Configure Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  console.log('Socket connected:', socket.id);

  socket.on('add_action', (action) => {
    try {
      scheduler.addAction(action);
      io.emit('queue_updated', scheduler.getCreditsAndQueue());
    } catch (error) {
      socket.emit('action_error', { success: false, message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set up routes
app.use('/actions', actionsRouter(scheduler));

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Export app and scheduler for potential use in other modules or for testing
export { app, scheduler, io };
