// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([11, 22, 33, 44])).toStrictEqual({
      value: 11,
      next: {
        value: 22,
        next: {
          value: 33,
          next: { value: 44, next: { value: null, next: null } },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([11, 22, 33, 44])).toMatchSnapshot(`{
      value: 11,
      next: {
        value: 22,
        next: {
          value: 33,
          next: { value: 44, next: { value: null, next: null } },
        },
      },
    }`);
  });
});
