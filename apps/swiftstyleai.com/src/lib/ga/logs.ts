import trim from 'lodash/trim';
import ReactGA from 'react-ga4';

import { isProd } from '@/constant/env';

import { getInit, getPath, getTitle } from './utils';

// https://github.com/react-ga/react-ga/blob/master/src/core.js#LL188C1-L228C2
/**
 * pageview:
 * Basic GA pageview tracking
 * @param {String} path - the current page page e.g. '/about'
 * @param {String} title - (optional) the page title e. g. 'My Website'
 * @param {Array} trackerNames - (optional) a list of extra trackers to run the command on
 */
export function logPageView(
  rawPath: string | undefined = getPath(),
  title: string | undefined = getTitle(),
  isPrd = isProd
) {
  // /blogs/smart-home-technology/the-best-smart-home-devices-2023/ === window.location.pathname
  // title = document.title
  if (!getInit()) {
    console.warn(
      'initGA is not run yet. maybe you are running in development mode!',
      process.env.NODE_ENV
    );
  }

  if (!isPrd) {
    return;
  }

  if (!rawPath) {
    console.warn('path is required in .pageview()');
    return;
  }

  const path = trim(rawPath);
  if (path === '') {
    console.warn('path cannot be an empty string in .pageview()');
    return;
  }

  const extraFields: {
    title?: string;
  } = {};

  if (title) {
    extraFields.title = title;
  }

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    ...extraFields,
  });
}

// Tracking in-page event interactions is key to understanding the use of any interactive web property.
// This is how we record user interactions that don't trigger a change in URL.
