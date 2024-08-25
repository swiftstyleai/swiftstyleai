// import { createClient } from '@bs/utils/supabase';
import { AbstractHandler, RequestType } from '@llm-101/ipc';
import { SUPABASE_URL, APP_URL } from '../../constants';
import { getAuthToken } from '../../utils/supabase/cookie';

export class TokenRefreshedHandler extends AbstractHandler {
  public async handle(request: RequestType) {
    const { type, data } = request;
    if (type === 'TOKEN_REFRESHED') {
      // step 1: get current session
      const sessionData = await getAuthToken({
        supabaseUrl: SUPABASE_URL,
        url: APP_URL,
      });

      // step 2: compare to data
      const { session } = data;
      if (
        session.access_token !== sessionData.value.access_token &&
        session.refresh_token !== sessionData.value.refresh_token
      ) {
        // step 3: save if need
        console.log(sessionData, data, 'SignedInHandler sessionData');
      }
      console.log(sessionData, data, 'SignedInHandler sessionData');
    }
    return super.handle(request);
  }
}
