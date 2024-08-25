import { type AuthChangeEvent, type Session } from '@supabase/supabase-js';
import Debug from 'debug';
import { sendChromeMessageIPC } from '@llm-101/ipc';
import { DEBUG } from './constants';
import supabase from './utils/supabase/index';

Debug.enable(DEBUG);

const debug = Debug('content:index');

(async () => {
  // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
  const syncSession = async (
    event: AuthChangeEvent,
    session: Session | null,
  ) => {
    debug(event, 'event');
    debug(session, 'session');

    sendChromeMessageIPC({
      type: event,
      data: {
        from: 'swiftstyleai.com-content',
        session,
      },
    });

    // Add more specific handling for each event if necessary
    // switch (event) {
    //   case 'SIGNED_IN':
    //     // handle sign in event
    //     break;
    //   case 'SIGNED_OUT':
    //     // handle sign out event
    //     break;
    //   case 'PASSWORD_RECOVERY':
    //     // handle password recovery event
    //     break;
    //   case 'TOKEN_REFRESHED':
    //     // handle token refreshed event
    //     break;
    //   case 'USER_UPDATED':
    //     // handle user updated event
    //     break;
    //   case 'INITIAL_SESSION':
    //     // handle initial session
    //     break;
    //   default:
    //     break;
    // }
  };

  supabase.auth.onAuthStateChange(syncSession);

  const sessionData = await sendChromeMessageIPC({
    type: 'GET_AUTH_COOKIES',
    data: {
      from: 'swiftstyleai.com-content',
    },
  });

  debug(sessionData, 'sessionData');

  if (sessionData) {
    const { error, data: _ } = await supabase.auth.setSession({
      access_token: sessionData.access_token,
      refresh_token: sessionData.refresh_token,
    });

    if (error) {
      console.error('Error setting session:', error);
    }
  } else {
    sendChromeMessageIPC({
      type: 'SIGNED_OUT',
      data: {
        from: 'swiftstyleai.com-content',
      },
    });
  }
})();
