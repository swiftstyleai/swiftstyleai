import { type ResultType, type RequestType } from './types';

export interface ChromeMessageResponse {
  res?: any;
  err?: string;
}

export function sendChromeMessageIPC<T = any>(
  params: RequestType<T>,
): Promise<ResultType> {
  return new Promise((resolve, reject) => {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(
        chrome.runtime.id,
        params,
        (response: ChromeMessageResponse) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            const { res, err } = response;
            if (err) {
              reject(new Error(`Chrome Message Error: ${err}`));
            } else {
              resolve(res);
            }
          }
        },
      );
    } else {
      reject(
        new Error(
          `chrome.runtime is not available to send ${JSON.stringify(params)}`,
        ),
      );
      console.warn(
        `chrome.runtime is not available to send ${JSON.stringify(params)}`,
      );
    }
  });
}

export * from './chain';
