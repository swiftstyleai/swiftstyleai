import ReactGA from 'react-ga4';

import { logPageView } from './logs';
import { initGA } from './utils';

describe('lib/ga/logs', () => {
  it('should return true', async () => {
    const requestSpy = jest.spyOn(ReactGA, 'send');
    // init
    const title = 'The best smart home devices 2023';
    const path =
      '/blogs/smart-home-technology/the-best-smart-home-devices-2023/';

    initGA('key', true);
    logPageView(path, title, true);

    expect(requestSpy).toHaveBeenCalledWith({
      hitType: 'pageview',
      title,
      page: path,
    });
    expect(ReactGA.isInitialized).toEqual(true);
  });
});
