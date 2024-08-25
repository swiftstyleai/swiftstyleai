import 'webextension-polyfill';
import Debug from 'debug';
import { exampleThemeStorage } from '@llm-101/storage';
import { execute } from './commands';
import { DEBUG } from './constants';
import './auth';

Debug.enable(DEBUG);
const debug = Debug('extension:main');

exampleThemeStorage.get().then((theme) => {
  console.log('theme', theme);
});

debug('hello');

console.log('background loaded');
console.log(
  "Edit 'chrome-extension/lib/background/index.ts' and save to reload.",
);

// https://stackoverflow.com/questions/44056271/chrome-runtime-onmessage-response-with-async-await
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  (async () => {
    try {
      const response = await execute(request);
      sendResponse({ res: response, err: null });
    } catch (error) {
      sendResponse({ res: null, err: error.message });
    }
  })();

  // console.log(sender);
  // Important! Return true to indicate you want to send a response asynchronously
  return true;
});
