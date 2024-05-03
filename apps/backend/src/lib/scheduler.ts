import { CreditManager } from './creditManager';
import { Action, Credits } from './types';

export class Scheduler {
  private queue: Action[] = [];
  private credits: Credits;
  constructor(private creditManager: CreditManager) {
    this.credits = creditManager.getCredits();
  }

  public scheduleActions(): void {
    // Execute actions every 15 seconds
    setInterval(() => {
      if (this.queue.length > 0) {
        const action = this.queue.shift();
        if (action && this.credits[action.type] > 0) {
          this.credits[action.type]--;
          console.log(
            `Executed action ${action.type}, remaining credits: ${
              this.credits[action.type]
            }`
          );
        } else if (action) {
          console.log(`Not enough credits to execute action ${action.type}`);
        }
      }
    }, 15000);
    
    // Recalculate credits every 10 minutes
    setInterval(() => {
      this.credits = this.creditManager.recalculateCredits();
      console.log(`Credits recalculated.`);
    }, 600000);
  }

  public addAction(type: string): void {
    this.queue.push({ type });
  }

  public getCreditsAndQueue(): { credits: Credits; queue: string[] } {
    return {
      credits: this.credits,
      queue: this.queue.map((item) => item.type),
    };
  }
}
