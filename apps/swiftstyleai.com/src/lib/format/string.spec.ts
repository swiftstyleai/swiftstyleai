import { formatStringToArray, getFirstLetterWords } from './string';

describe('libs/format/string', () => {
  describe('formatStringToArray', () => {
    test('splits string by separator and removes empty elements', () => {
      const formatString = 'h:m:s';
      const expectedArray = ['h', 'm', 's'];
      expect(formatStringToArray(formatString)).toEqual(expectedArray);
    });

    // test('handles empty string', () => {
    //   const formatString = '';
    //   const expectedArray = [];
    //   expect(formatStringToArray(formatString)).toEqual(expectedArray);
    // });

    // test('handles string with only separator', () => {
    //   const formatString = ':';
    //   const expectedArray = [];
    //   expect(formatStringToArray(formatString)).toEqual(expectedArray);
    // });

    test('handles string with custom separator', () => {
      const formatString = 'h-m-s';
      const expectedArray = ['h', 'm', 's'];
      expect(formatStringToArray(formatString, '-')).toEqual(expectedArray);
    });

    test('handles string with leading/trailing whitespace', () => {
      const formatString = ' h:m:s ';
      const expectedArray = ['h', 'm', 's'];
      expect(formatStringToArray(formatString)).toEqual(expectedArray);
    });

    test('handles string with whitespace around separator', () => {
      const formatString = 'h : m:s';
      const expectedArray = ['h', 'm', 's'];
      expect(formatStringToArray(formatString)).toEqual(expectedArray);
    });
  });

  describe('getFirstLetterWords', () => {
    it('should return an empty string for an empty input string', () => {
      const result = getFirstLetterWords('');
      expect(result).toBe('');
    });

    it('should return the first letters of each word in the input string', () => {
      const result = getFirstLetterWords('hello world');
      expect(result).toBe('hw');
    });

    it('should return the first letters of each word, including punctuation marks', () => {
      const result = getFirstLetterWords('one, two, three!');
      expect(result).toBe('ott');
    });

    it('should handle multiple spaces between words', () => {
      const result = getFirstLetterWords('  word  one  ');
      expect(result).toBe('wo');
    });

    it('should handle uppercase letters', () => {
      const result = getFirstLetterWords('Hello World');
      expect(result).toBe('HW');
    });

    it('should handle special characters and numbers', () => {
      const result = getFirstLetterWords('@hello &world 123');
      expect(result).toBe('@&1');
    });
  });
});
