import { openGraph } from '@/lib/og';

import { deploymentURL } from '@/constant/env';

describe('lib/og', () => {
  describe('openGraph', () => {
    it('should return a URL with the encoded templateTitle when specified', () => {
      const result = openGraph({
        title: 'Test Template Title',
      });
      expect(result).toBe(
        `${deploymentURL}/og?title=Test%2520Template%2520Title`
      );
    });

    it('should return a URL with both title and description when both are specified', () => {
      const result = openGraph({
        title: 'Test Title',
        description: 'Test Description',
      });
      expect(result).toBe(
        `${deploymentURL}/og?title=Test%2520Title&description=Test%2520Description`
      );
    });

    it('should correctly encode special characters in title and description', () => {
      const result = openGraph({
        title: 'Title with special chars: &%#',
        description: 'Description with special chars: &%#',
      });
      expect(result).toBe(
        `${deploymentURL}/og?title=Title%2520with%2520special%2520chars%253A%2520%2526%2525%2523&description=Description%2520with%2520special%2520chars%253A%2520%2526%2525%2523`
      );
    });

    it('should include additional parameters in the URL if provided', () => {
      const result = openGraph({
        title: 'Test Title',
        description: 'Test Description',
        extraParam: 'Extra Value',
      });
      expect(result).toBe(
        `${deploymentURL}/og?title=Test%2520Title&extraParam=Extra+Value&description=Test%2520Description`
      );
    });

    it('should handle missing description gracefully', () => {
      const result = openGraph({
        title: 'Test Title',
      });
      expect(result).toBe(`${deploymentURL}/og?title=Test%2520Title`);
    });

    it('should handle empty title gracefully', () => {
      const result = openGraph({
        title: '',
      });
      expect(result).toBe(`${deploymentURL}/og?title=`);
    });

    it('should handle empty strings in title and description', () => {
      const result = openGraph({
        title: '   ',
        description: '   ',
      });
      expect(result).toBe(`${deploymentURL}/og?title=`);
    });
  });
});
