// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/users';
  const users = [
    { id: 101, name: 'Bobby' },
    { id: 102, name: 'Robby' },
  ];

  const getMockedGetMethod = () => jest.spyOn(axios.Axios.prototype, 'get');

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyOnCreate = jest.spyOn(axios, 'create');
    const spyOnGet = getMockedGetMethod();

    spyOnGet.mockResolvedValue({ data: users });
    await throttledGetDataFromApi(relativePath);
    expect(spyOnCreate).toHaveBeenLastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spyOnGet = getMockedGetMethod();

    spyOnGet.mockResolvedValue({ data: users });
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(spyOnGet).toHaveBeenLastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const spyOnGet = getMockedGetMethod();

    spyOnGet.mockResolvedValue({ data: users });
    await expect(throttledGetDataFromApi(relativePath)).resolves.toBe(users);
  });
});
