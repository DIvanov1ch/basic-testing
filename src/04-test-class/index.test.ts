// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    expect(getBankAccount(initialBalance).getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(0).withdraw(1000)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(0).transfer(1000, getBankAccount(0))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const testAccount = getBankAccount(1000);
    expect(() => testAccount.transfer(100, testAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 1000;
    const testAccount = getBankAccount(balance).deposit(balance);
    expect(testAccount.getBalance()).toBe(balance + balance);
  });

  test('should withdraw money', () => {
    const balance = 1000;
    const testAccount = getBankAccount(balance).withdraw(balance);
    expect(testAccount.getBalance()).toBe(balance - balance);
  });

  test('should transfer money', () => {
    const balance = 1000;
    const firstAccount = getBankAccount(balance);
    const secondAccount = getBankAccount(balance);
    const spyWithdraw = jest.spyOn(firstAccount, 'withdraw');
    const spyDeposit = jest.spyOn(secondAccount, 'deposit');
    firstAccount.transfer(balance, secondAccount);

    expect(spyWithdraw).toHaveBeenCalled();
    expect(spyDeposit).toHaveBeenCalled();
    expect(firstAccount.getBalance()).toBe(balance - balance);
    expect(secondAccount.getBalance()).toBe(balance + balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 50;
    const spy = jest.spyOn(lodash, 'random');
    spy.mockReturnValueOnce(balance);
    spy.mockReturnValueOnce(1);

    const request = await getBankAccount(1000).fetchBalance();

    expect(request).toBe(balance);
    expect(typeof request).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const fetchedBalance = 50;
    const testAccount = getBankAccount(initialBalance);
    const spy = jest.spyOn(testAccount, 'fetchBalance');
    spy.mockResolvedValueOnce(fetchedBalance);

    expect(testAccount.getBalance()).toBe(initialBalance);

    await testAccount.synchronizeBalance();

    expect(testAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const testAccount = getBankAccount(1000);
    const spy = jest.spyOn(testAccount, 'fetchBalance');
    spy.mockResolvedValueOnce(null);

    await expect(() => testAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
