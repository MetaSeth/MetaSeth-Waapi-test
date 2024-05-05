import { CreditConfig } from '@Waapi/types';
import { CreditManager } from './creditManager';
import { Scheduler } from './scheduler';
import { io } from 'socket.io-client';

jest.mock('socket.io-client', () => {
  const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    close: jest.fn(),
  };
  return {
    io: jest.fn(() => mockSocket),
  };
});
describe('Scheduler', () => {
  let config: CreditConfig = { maxCredits: { A: 9, B: 10, C: 13 } };
  let creditManager: CreditManager;
  let scheduler: Scheduler;
  let mockSocket;
  beforeEach(() => {
    creditManager = new CreditManager(config);
    mockSocket = io();
    scheduler = new Scheduler(creditManager, mockSocket);
  });

  afterEach(() => {
    scheduler.clearIntervals();
  });

  test('should add an action to the queue', () => {
    scheduler.addAction({ type: 'A' });
    const { queue } = scheduler.getCreditsAndQueue();
    expect(queue).toContainEqual({ type: 'A' });
  });

  test('should maintain the correct queue order', () => {
    scheduler.addAction({ type: 'A' });
    scheduler.addAction({ type: 'B' });
    const { queue } = scheduler.getCreditsAndQueue();
    expect(queue).toEqual([{ type: 'A' }, { type: 'B' }]);
  });
});
