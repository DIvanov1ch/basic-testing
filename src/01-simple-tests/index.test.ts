// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(sum).toBe(5);
  });

  test('should subtract two numbers', () => {
    const difference = simpleCalculator({
      a: 3,
      b: 1,
      action: Action.Subtract,
    });
    expect(difference).toBe(2);
  });

  test('should multiply two numbers', () => {
    const product = simpleCalculator({ a: 2, b: 3, action: Action.Multiply });
    expect(product).toBe(6);
  });

  test('should divide two numbers', () => {
    const quotient = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(quotient).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const power = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(power).toBe(8);
  });

  test('should return null for invalid action', () => {
    const NonExistentAction = ':';
    const result = simpleCalculator({ a: 2, b: 3, action: NonExistentAction });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '2', b: null, action: Action.Add });
    expect(result).toBeNull();
  });
});
