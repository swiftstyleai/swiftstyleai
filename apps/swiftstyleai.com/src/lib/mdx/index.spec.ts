import { extractMarkdownHeaders, generateSlug } from './index';

describe('lib/mdx', () => {
  describe('generateSlug', () => {
    it('should return true', async () => {
      expect(generateSlug('Design and Features')).toEqual(
        'design-and-features'
      );
      expect(generateSlug('Conclusions')).toEqual('conclusions');
      expect(generateSlug('Máy Lọc Không Khí Levoit là Gì?')).toEqual(
        'máy-lọc-không-khí-levoit-là-gì'
      );
      expect(generateSlug()).toEqual('');
    });
  });

  describe('extractMarkdownHeaders', () => {
    it('should return true', async () => {
      expect(extractMarkdownHeaders('abc')).toEqual({});
      expect(extractMarkdownHeaders('# A')).toEqual({ h1: ['A'] });
      expect(
        extractMarkdownHeaders(`# A
## B
### C
`)
      ).toEqual({ h1: ['A'], h2: ['B'], h3: ['C'] });
    });
  });
});
