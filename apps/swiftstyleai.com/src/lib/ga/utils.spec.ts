import ReactGA from 'react-ga4';

import { initGA, isClient } from './utils';

describe('lib/ga/utils', () => {
  it('should return true', async () => {
    expect(isClient).toEqual(true);
  });

  describe('initGA', () => {
    it('should return true', async () => {
      const requestSpy = jest.spyOn(ReactGA, 'initialize');
      const key = 'key';
      initGA(key, true);

      expect(requestSpy).toHaveBeenCalledWith(key);

      expect(ReactGA.isInitialized).toEqual(true);
    });

    it('should not call if key is undefined', async () => {
      const requestSpy = jest.spyOn(ReactGA, 'initialize');
      initGA(undefined, true);
      expect(requestSpy).toHaveBeenCalledTimes(0);
      expect(ReactGA.isInitialized).toEqual(true);
    });
  });
});
