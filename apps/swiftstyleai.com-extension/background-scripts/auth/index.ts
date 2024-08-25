import { type AuthChangeEvent, type Session } from '@supabase/supabase-js';
import { APP_URL, SUPABASE_URL } from '../constants';
import { createClient } from '../utils/supabase';
import { getAuthToken } from '../utils/supabase/cookie';

(async () => {
  const sessionData = await getAuthToken({
    supabaseUrl: SUPABASE_URL,
    url: APP_URL,
  });

  // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
  const supabase = createClient();
  const syncSession = (event: AuthChangeEvent, session: Session | null) => {
    console.log(event, session);
    // if (event === 'INITIAL_SESSION') {
    //   // handle initial session
    // } else if (event === 'SIGNED_IN') {
    //   // handle sign in event
    // } else if (event === 'SIGNED_OUT') {
    //   // handle sign out event
    // } else if (event === 'PASSWORD_RECOVERY') {
    //   // handle password recovery event
    // } else if (event === 'TOKEN_REFRESHED') {
    //   // handle token refreshed event
    // } else if (event === 'USER_UPDATED') {
    //   // handle user updated event
    // }
  };

  // const { data: authListener } = supabase.auth.onAuthStateChange(syncSession);
  supabase.auth.onAuthStateChange(syncSession);
  // authListener?.subscription.unsubscribe();
  if (sessionData && sessionData.value) {
    const { error, data } = await supabase.auth.setSession({
      access_token: sessionData.value.access_token,
      refresh_token: sessionData.value.refresh_token,
    });

    if (error) {
      console.error('Error setting session:', error);
    } else {
      console.log(data, 'data');
    }
    console.log(await supabase.auth.getSession());
  }
})();
