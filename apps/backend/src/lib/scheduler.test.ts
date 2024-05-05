import { CreditConfig } from '@Waapi/types';
import { CreditManager } from './creditManager';
import { Scheduler } from './scheduler';

describe('Scheduler', () => {
  let config: CreditConfig = { maxCredits: { A: 9, B: 10, C: 13 } };
  let creditManager: CreditManager;
  let scheduler: Scheduler;
  beforeEach(() => {
    creditManager = new CreditManager(config);
    scheduler = new Scheduler(creditManager);
  });

  test('should add an action to the queue', () => {
    scheduler.addAction('A');
    const { queue } = scheduler.getCreditsAndQueue();
    expect(queue).toContain('A');
  });

  test('should maintain the correct queue order', () => {
    scheduler.addAction('A');
    scheduler.addAction('B');
    const { queue } = scheduler.getCreditsAndQueue();
    expect(queue).toEqual(['A', 'B']);
  });
});
