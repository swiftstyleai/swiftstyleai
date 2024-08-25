import { convertNumberToDuration, formatIsoDate } from './date';

describe('libs/format/date', () => {
  describe('convertNumberToDuration', () => {
    // it('should throw an error for non-numeric input', () => {
    //   expect(() => convertNumberToDuration('hello')).toThrowError(
    //     'Input must be a non-negative number'
    //   );
    // });

    it('should throw an error for negative input', () => {
      expect(() => convertNumberToDuration(-10)).toThrowError(
        'Input must be a non-negative number'
      );
    });

    it('should handle basic conversion (h:m:s format)', () => {
      const result = convertNumberToDuration(3700);
      expect(result).toEqual({ hours: 1, minutes: 1, seconds: 40 });
    });

    it('should handle conversion with different format (m:s)', () => {
      const result = convertNumberToDuration(125, 'm:s');
      expect(result).toEqual({ minutes: 2, seconds: 5 });
    });

    it('should handle zero input with default format', () => {
      const result = convertNumberToDuration(0);
      expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });

    it('should handle format with unsupported unit', () => {
      expect(() => convertNumberToDuration(100, 'x:m:s')).toThrowError(
        "The 'x' format is not found."
      );
    });
  });

  describe('formatIsoDate', () => {
    test('formats a valid ISO date string to yyyy-MM-dd', () => {
      const isoDateStr = '2024-06-03T11:11:02.766342+00:00';
      const formattedDate = formatIsoDate(isoDateStr);
      expect(formattedDate).toBe('2024-06-03');
    });

    test('formats a different valid ISO date string to yyyy-MM-dd', () => {
      const isoDateStr = '2023-12-25T00:00:00.000Z';
      const formattedDate = formatIsoDate(isoDateStr);
      expect(formattedDate).toBe('2023-12-25');
    });

    test('throws an error for an invalid ISO date string', () => {
      expect(() => {
        formatIsoDate('invalid-date');
      }).toThrow();
    });

    test('handles edge cases correctly', () => {
      const isoDateStr = '2024-02-29T23:59:59.999Z';
      const formattedDate = formatIsoDate(isoDateStr);
      expect(formattedDate).toBe('2024-02-29');
    });
  });
});
