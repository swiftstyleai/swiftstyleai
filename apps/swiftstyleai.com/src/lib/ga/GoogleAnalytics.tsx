'use client';

import Debug from 'debug';
import * as React from 'react';
import ReactGA from 'react-ga4';

import { ACTION, CATEGORY, EVENT, LABEL, SPLIT } from './constants';
import { logPageView } from './logs';
import { initGA } from './utils';

const debug = Debug('lib:ga:GoogleAnalytics');

// So we can write code like:
//
// <Button
//   data-g-category="demo"
//   data-g-action="expand"
// >
//   Foo
// </Button>
function handleClick(event: any) {
  let element = event.target;

  while (element && element !== document) {
    const category = element.getAttribute(CATEGORY);

    // We reach a tracking element, no need to look higher in the dom tree.
    if (category) {
      const split = parseFloat(element.getAttribute(SPLIT));

      if (split && split < Math.random()) {
        return;
      }
      const e = element.getAttribute(EVENT) || 'event';
      ReactGA.send({
        hitType: e,
        eventCategory: category,
        eventAction: element.getAttribute(ACTION),
        eventLabel: element.getAttribute(LABEL),
      });
      break;
    }

    element = element.parentElement;
  }
}

let bound = false;

function GoogleAnalytics() {
  debug(`render`);

  React.useEffect(() => {
    // Wait for the title to be updated.
    setTimeout(() => {
      ReactGA.set({ page: window.location.pathname });
      logPageView();
    }, 0);

    if (bound) {
      return;
    }
    initGA();
    document.addEventListener('click', handleClick);
    bound = true;
  }, []);

  return null;
}

if (process.env.NODE_ENV !== 'production') {
  GoogleAnalytics.displayName = 'utils_ga__GoogleAnalytics';
}

export default GoogleAnalytics;
