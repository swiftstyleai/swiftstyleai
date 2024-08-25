import {
  APP_URL,
  SUPABASE_URL,
} from '../constants';
import {
  type GetAccessTokenParams,
  type SetCookieParams,
  getCookies,
} from '@llm-101/cookies';
import { type RequestType, AbstractHandler } from '@llm-101/ipc';
import { getAuthToken } from '../utils/supabase/cookie';

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
export class GetCookiesHandler extends AbstractHandler {
  public async handle(request: RequestType<GetAccessTokenParams>) {
    if (request.type === 'GET_COOKIES') {
      return await getCookies(request.data);
    }
    return super.handle(request);
  }
}

export class SetCookiesHandler extends AbstractHandler {
  public async handle(request: RequestType<SetCookieParams>) {
    if (request.type === 'SET_COOKIES') {
      return await getCookies(request.data);
    }
    return super.handle(request);
  }
}

export class GetAuthCookiesHandler extends AbstractHandler {
  public async handle(request: RequestType<SetCookieParams>) {
    if (request.type === 'GET_AUTH_COOKIES') {
      const session = await getAuthToken({
        supabaseUrl: SUPABASE_URL,
        url: APP_URL,
      });

      if(!session || !session.value) {
        return null;
      }

      const { access_token, refresh_token } = session.value;

      return {
        access_token,
        refresh_token,
      };
    }

    return super.handle(request);
  }
}
