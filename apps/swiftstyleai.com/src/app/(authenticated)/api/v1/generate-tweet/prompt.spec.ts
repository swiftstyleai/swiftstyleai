import { generatePrompt } from './prompt';

describe('app/api/v1/generate-tweet/prompt', () => {
  describe('generatePrompt', () => {
    it('should generate the correct prompt for a given input', () => {
      const input = 'write something funny';
      const expectedOutput = `Please create a tweet based on the your's input below without altering its meaning. Anything in brackets () in the input are criteria that the tweet must satisfy:\n
write something funny`;

      const result = generatePrompt(input);

      expect(result).toBe(expectedOutput);
    });

    it('should handle an input with multiple criteria', () => {
      const input =
        'write something funny (please write something with the word usa)';
      const expectedOutput = `Please create a tweet based on the your's input below without altering its meaning. Anything in brackets () in the input are criteria that the tweet must satisfy:\n
write something funny (please write something with the word usa)`;

      const result = generatePrompt(input);

      expect(result).toBe(expectedOutput);
    });

    it('should handle an empty input', () => {
      const input = '';
      const expectedOutput = `Please create a tweet based on the your's input below without altering its meaning. Anything in brackets () in the input are criteria that the tweet must satisfy:\n
`;

      const result = generatePrompt(input);

      expect(result).toBe(expectedOutput);
    });
  });
});
