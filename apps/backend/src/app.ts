import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { actionsRouter } from './api/actionsRouter';
import { CreditManager } from './lib/creditManager';
import { Scheduler } from './lib/scheduler';

// Create express application
const app = express();
app.use(cors())
app.use(bodyParser.json());

// Set up dependencies
const creditConfig = { maxCredits: { A: 10, B: 10, C: 15 }};
const creditManager = new CreditManager(creditConfig);
const scheduler = new Scheduler(creditManager);
scheduler.scheduleActions();

// Set up routes
app.use('/actions', actionsRouter(scheduler));

export default app;
