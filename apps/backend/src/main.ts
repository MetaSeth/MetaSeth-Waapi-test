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

const creditConfig = { maxCredits: { A: 10, B: 10, C: 15 } };
const creditManager = new CreditManager(creditConfig);

const server = http.createServer(app);
app.set('server', server);

const io = new SocketIOServer(server, { cors: { origin: '*' } });

const scheduler = new Scheduler(creditManager, io);
scheduler.scheduleActions();

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

app.use('/actions', actionsRouter(scheduler));

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

process.on('SIGINT', () => {
  console.log('Application is shutting down.');
  scheduler.clearIntervals();
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Application received a termination signal.');
  scheduler.clearIntervals();
  server.close(() => {
    process.exit(0);
  });
});
export { app, scheduler, io };
