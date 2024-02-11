// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  const mockedFunction = jest.fn(() => void 0);
  return {
    ...originalModule,
    mockOne: mockedFunction,
    mockTwo: mockedFunction,
    mockThree: mockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spy = jest.spyOn(console, 'log');

    mockOne();
    expect(spy).not.toBeCalled();
    mockTwo();
    expect(spy).not.toBeCalled();
    mockThree();
    expect(spy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spy = jest.spyOn(console, 'log');

    unmockedFunction();
    expect(spy).toBeCalledTimes(1);
  });
});
