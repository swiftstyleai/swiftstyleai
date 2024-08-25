import { createClient } from '@bs/utils/supabase';
import Debug from 'debug';
import { AbstractHandler, RequestType } from '@llm-101/ipc';
// import { SUPABASE_URL, APP_URL } from '../../constants';

const debug = Debug('extension:auth:commands:SignedInHandler');

export class SignedInHandler extends AbstractHandler {
  public async handle(request: RequestType) {
    const {
      type,
      data: { session: sessionRequest },
    } = request;
    if (type === 'SIGNED_IN') {
      debug('request', request);
      const supabase = createClient();
      const {
        data: { session: sessionAuth },
      } = await supabase.auth.getSession();

      debug('sessionAuth', sessionAuth);

      // case 1: if session is null (unauthenticated)
      if (!sessionAuth) {
        const { error, data: _ } = await supabase.auth.setSession({
          access_token: sessionRequest.access_token,
          refresh_token: sessionRequest.refresh_token,
        });
        if (error) {
          console.error('Error setting session:', error);
        }
      }

      // case 2: update new session

    }
    return super.handle(request);
  }
}
