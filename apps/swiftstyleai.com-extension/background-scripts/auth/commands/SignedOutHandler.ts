// import { createClient } from '@bs/utils/supabase';
import Debug from 'debug';
import { createClient } from '@bs/utils/supabase';
import { AbstractHandler, RequestType } from '@llm-101/ipc';

const debug = Debug('extension:auth:commands:SignedOutHandler');

export class SignedOutHandler extends AbstractHandler {
  public async handle(request: RequestType) {
    if (request.type === 'SIGNED_OUT') {
      debug(request);
      const supabase = createClient();
      return await supabase.auth.signOut();
    }
    return super.handle(request);
  }
}
