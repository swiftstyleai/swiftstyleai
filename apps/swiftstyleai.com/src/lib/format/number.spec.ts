import { formatToTwoDigits } from './number';

describe('libs/format/number', () => {
  describe('formatToTwoDigits', () => {
    test('formatToTwoDigits formats single-digit numbers with leading zero', () => {
      expect(formatToTwoDigits(1)).toBe('01');
      expect(formatToTwoDigits(2)).toBe('02');
    });

    test('formatToTwoDigits leaves double-digit numbers unchanged', () => {
      expect(formatToTwoDigits(11)).toBe('11');
      expect(formatToTwoDigits(123)).toBe('123');
    });

    // test('formatToTwoDigits throws error for non-numeric input', () => {
    //   expect(() => formatToTwoDigits('abc')).toThrowError(
    //     'Input must be a number greater than or equal to zero'
    //   );
    // });

    test('formatToTwoDigits throws error for negative numbers', () => {
      expect(() => formatToTwoDigits(-1)).toThrowError(
        'Input must be a number greater than or equal to zero'
      );
    });
  });
});
