import { log } from 'console';
import { CreditManager } from './creditManager';
import { Credits } from './types';
describe('Credit Manager', () => {
    let creditManager: CreditManager;
    let initialConfig : {maxCredits : Credits};

    beforeEach(() => {
        initialConfig = { maxCredits: { A: 9, B: 10, C: 13 } };
        creditManager = new CreditManager(initialConfig);
    });


  test('should provide initial credits correctly', () => {
    const credits = creditManager.getCredits();
    expect(credits).toEqual({ A: expect.any(Number), B: expect.any(Number), C: expect.any(Number) });
  });

  test('should recalculate credits within the specified range', () => {
    
    const recalculated = creditManager.recalculateCredits();
    console.log('Credits',creditManager.getCredits());
    Object.keys(recalculated).forEach(key => {
      const maxCredit = initialConfig.maxCredits[key];
      expect(recalculated[key]).toBeGreaterThanOrEqual(Math.round(0.8 * maxCredit));
      expect(recalculated[key]).toBeLessThanOrEqual(maxCredit);
    });
  });
});