import { APP_URL } from '../constants';
// import { type SetCookieParams, getCookies } from '@llm-101/cookies';
import { type SetCookieParams } from '@llm-101/cookies';
// import { getAuthTokenKey, getAuthTokenVerifierKey } from '@llm-101/cookies';

import { AbstractHandler, type RequestType } from '@llm-101/ipc';

export interface TweetData {
  text: string;
  user: string;
  name?: string;
  profilePictureUrl?: string;
  publishedDate?: string;
}

export interface GenerateReplyForTwitterArgs {
  text: string;
  user: string;
  input?: string;
  replies: TweetData[];
}

export interface GenerateReplyResponse {
  response: string;
}

export class GenerateReplyHandler extends AbstractHandler {
  public async handle(request: RequestType<SetCookieParams>) {
    if (request.type === 'GENERATE_REPLY') {
      // const authToken = getAuthTokenKey(APP_URL);
      // const cookie = await getCookies({
      //   url: APP_URL,
      //   name: authToken,
      // });

      // const authTokenVerifier = getAuthTokenVerifierKey(APP_URL);
      // const cookieVerifier = await getCookies({
      //   url: APP_URL,
      //   name: authTokenVerifier,
      // });

      const response = await fetch(`${APP_URL}/api/v2/generate-reply`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Cookie: `${authToken}=${cookie}; ${authTokenVerifier}=${cookieVerifier};`,
        },
        method: 'POST',
        // credentials: 'include',
        body: JSON.stringify(request.data),
      });

      // Check if the response is not ok
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const result: GenerateReplyResponse = await response.json();
      return result;
    }
    return super.handle(request);
  }
}

export class GenerateTweetHandler extends AbstractHandler {
  public async handle(request: RequestType<SetCookieParams>) {
    if (request.type === 'GENERATE_TWEET') {
      const response = await fetch(`${APP_URL}/api/v2/generate-tweet`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // 'Supabase-Access-Token': `Bearer ${access_token}`,
          // 'Supabase-Refresh-Token': refresh_token,
        },
        method: 'POST',
        // credentials: 'include',
        body: JSON.stringify(request.data),
      });

      // Check if the response is not ok
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const result: GenerateReplyResponse = await response.json();
      return result;
    }
    return super.handle(request);
  }
}
