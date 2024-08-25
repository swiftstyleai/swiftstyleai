import ReactGA from 'react-ga4';

import env from '@/constant/client';
import { isProd } from '@/constant/env';

export const isClient = typeof window !== undefined;

export function getGAKeyEnv() {
  return env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
}

export function initGA(
  key: string | undefined = getGAKeyEnv(),
  isPrd = isProd
) {
  try {
    if (isPrd && key && !ReactGA.isInitialized) {
      ReactGA.initialize(key);
    }
  } catch (err) {
    console.error(err);
  }
}

export function getInit() {
  return ReactGA.isInitialized;
}

export function getPath() {
  if (!isClient) {
    console.warn('getPath only run on client');
    return undefined;
  }
  return window.location.pathname;
}

export function getTitle() {
  if (!isClient) {
    console.warn('getTitle only run on client');
    return undefined;
  }
  return window.document.title;
}

// export const logEvent = (category = '', action = '') => {
//   if (category && action) {
//     ReactGA.event({ category, action });
//   }
// }

// export const logPageViewToGA = () => {
//   if(isProd) {
//     ReactGA.pageview(window.location.pathname + window.location.search);
//   }
// };

// ReactGA.send({
//   hitType: 'event',
//   eventCategory: category,
//   eventAction: element.getAttribute(ACTION),
//   eventLabel: element.getAttribute(LABEL),
// });
