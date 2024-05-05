import { CreditConfig, Credits } from "@Waapi/types";


export class CreditManager {
  private credits: Credits;
  private config: CreditConfig;

  constructor(config: CreditConfig) {
    this.config = config;
    this.credits = this.initializeCredits();
  }

  private initializeCredits(): Credits {
    const initialCredits: Credits = {};
    Object.keys(this.config.maxCredits).forEach((actionType) => {
      // Initialize credits to a random value between 80% and 100% of the max rounded  
      initialCredits[actionType] = Math.round(
        this.config.maxCredits[actionType] * (0.8 + Math.random() * 0.2))
    
    });
    return initialCredits;
  }

  public getCredits(): Credits {
    return this.credits;
  }

  public recalculateCredits(): Credits {
    Object.keys(this.credits).forEach((actionType) => {
      // Recalculate credits to a random value between 80% and 100% of the max 
      this.credits[actionType] =Math.round(
        this.config.maxCredits[actionType] * (0.8 + Math.random() * 0.2) )
    });
    return this.credits;
  }

  public useCredit(actionType: string): boolean {
    if (this.credits[actionType] > 0) {
      this.credits[actionType] -= 1;
      return true;
    }
    return false;
  }

  // public availableCredits(): Credits {
  //   const availableCredits: Credits = {};
  //   Object.keys(this.credits).forEach((actionType) => {
  //     if (this.credits[actionType] > 0) {
  //       availableCredits[actionType] = this.credits[actionType];
  //     }
  //   });
  //   return availableCredits;
  // }
}
