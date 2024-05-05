import { Server as SocketIOServer } from 'socket.io';
import { CreditManager } from './creditManager';
import { Action, Credits } from '@Waapi/types';

export class Scheduler {
  private queue: Action[] = [];
  private io: SocketIOServer;
  private actionInterval: NodeJS.Timeout | null = null;
  private creditInterval: NodeJS.Timeout | null = null;

  constructor(private creditManager: CreditManager, io) {
    this.io = io;
  }

  public scheduleActions(): void {
    // Execute actions every 15 seconds
    this.actionInterval = setInterval(() => {
      this.executeNextAction();
    }, 15000);

    // Recalculate credits every 10 minutes
    this.creditInterval = setInterval(() => {
      this.creditManager.recalculateCredits();
      console.log(`Credits recalculated.`);
    }, 600000);
  }
  // execute the next action in the queue with available credits
  executeNextAction() {
    if (this.queue.length === 0) {
      return;
    }

    for (let i = 0; i < this.queue.length; i++) {
      const action = this.queue[i];
      // if there are credits available for the action, execute it and remove it from the queue
      if (this.creditManager.useCredit(action.type)) {
        this.queue.splice(i, 1);
        console.log(`Executing action: ${action.type}`);
        this.io.emit('queue_updated', this.getCreditsAndQueue());
        break;
      }
    }
  }

  public clearIntervals(): void {
    if (this.actionInterval) clearInterval(this.actionInterval);
    if (this.creditInterval) clearInterval(this.creditInterval);
    this.actionInterval = null;
    this.creditInterval = null;
    console.log('Intervals cleared');
  }

  public addAction(action: Action): void {
    this.queue.push(action);
    console.log('### Action added: ${action.type} ###', action.type);
  }

  public getCreditsAndQueue(): { credits: Credits; queue: Action[] } {
    return {
      credits: this.creditManager.getCredits(),
      queue: this.queue,
    };
  }

  public getCredits(): Credits {
    return this.creditManager.getCredits();
  }

  public getQueue(): Action[] {
    return this.queue;
  }
}
