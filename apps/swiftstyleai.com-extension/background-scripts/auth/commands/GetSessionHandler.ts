import Debug from 'debug';
import { createClient } from '@bs/utils/supabase';
import { AbstractHandler, RequestType } from '@llm-101/ipc';

const debug = Debug('extension:auth:commands:GetSessionHandler');

export class GetSessionHandler extends AbstractHandler {
  public async handle(request: RequestType) {
    if (request.type === 'GET_SESSION') {
      debug(request);
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      }
      return data.session;
    }
    return super.handle(request);
  }
}
