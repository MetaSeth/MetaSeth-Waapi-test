import { Router, Request, Response } from 'express';
import { Scheduler } from '../lib/scheduler';

export const actionsRouter= (scheduler: Scheduler): Router =>{
    const router = Router();

    router.post('/add', (req: Request, res: Response) => {
        try {
            const { type } = req.body;
            if (!type) {
                return res.status(400).json({ message: 'Action type is required.' });
            }
            scheduler.addAction(type);
            res.status(200).send('Action added successfully.');
        } catch (error) {
            console.error('Error adding action:', error);
            res.status(500).send('Internal Server Error');
        }
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
}
