import { Router, Request, Response } from 'express';
import { Scheduler } from '../lib/scheduler';
import { actionTypes } from '../lib/actionsTypes';

export const actionsRouter = (scheduler: Scheduler): Router => {
  const router = Router();

  router.get('/types', (req, res) => {
    res.json(actionTypes);
  });

  router.get('/status', (req: Request, res: Response) => {
    try {
      const status = scheduler.getCreditsAndQueue();
      res.status(200).json(status);
    } catch (error) {
      console.error('Error fetching status:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
