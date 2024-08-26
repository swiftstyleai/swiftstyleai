// https://developer.chrome.com/docs/extensions/reference/api/cookies#type-CookieDetails
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cookie/index.d.ts
export type GetAccessTokenParams = {
  url: string;
  name: string;
};

// export type CookiePartitionKey = {
//   topLevelSite?: string | undefined;
// }

// export type Cookie = {
//   domain: string;
//   expirationDate?: number;
//   hostOnly: boolean;
//   httpOnly: boolean;
//   partitionKey?: CookiePartitionKey;
//   path: string;
// }

export function getCookies({
  url,
  name,
}: GetAccessTokenParams): Promise<any | null> {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url, name }, (cookie) => {
      // https://stackoverflow.com/a/28432087
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError.message));
      }
      if (!cookie || !cookie.value) {
        return resolve(null);
      }
      return resolve(cookie);
    });
  });
}

// {
//   "domain": "value",
//   "expirationDate": 1756147509.617321,
//   "hostOnly": true,
//   "httpOnly": false,
//   "name": "sb-ec2-47-129-18-54-auth-token",
//   "path": "/",
//   "sameSite": "lax",
//   "secure": false,
//   "session": false,
//   "storeId": "0",
//   "value": "value..."
// }

// export function getAllCookies(domain: string): Promise<Cookie[] | null> {
//   return new Promise((resolve, reject) => {
//     chrome.cookies.getAll({ url: domain }, (cookie) => {
//       if (chrome.runtime.lastError) {
//         return reject(new Error(chrome.runtime.lastError.message));
//       }
//       if (!cookie) {
//         return resolve(null);
//       }
//       return resolve(cookie);
//     });
//   });
// }

export type SetCookieParams = {
  url: string;
  name: string;
  value: string;
  expirationDate?: number;
};

export function setCookies({
  url,
  name,
  value,
  expirationDate,
}: SetCookieParams): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(
      {
        url,
        name,
        value,
        expirationDate,
      },
      (cookie) => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message));
        }
        return resolve();
      },
    );
  });
}

export { getAuthTokenKey, getAuthTokenVerifierKey } from './supabase';
