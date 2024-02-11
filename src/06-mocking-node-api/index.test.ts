// Uncomment the code below and write your tests
import path from 'path';
import fs, { promises } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const timeout = 1000;

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn(() => void 0);
    const setTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn(() => void 0);

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const timeout = 200;

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn(() => void 0);
    const setInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn(() => void 0);
    const steps = 5;

    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersToNextTimer(steps);
    expect(callback).toHaveBeenCalledTimes(steps);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'test-file.md';

  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const existsSync = jest.spyOn(fs, 'existsSync');

    existsSync.mockReturnValueOnce(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'There is test content here';
    const existsSync = jest.spyOn(fs, 'existsSync');
    const readFile = jest.spyOn(promises, 'readFile');

    existsSync.mockReturnValueOnce(true);
    readFile.mockResolvedValueOnce(fileContent);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
