import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Debug from 'debug';
import {
  APP_URL,
  SUPABASE_URL,
} from '@/constants';
import { sendChromeMessageIPC } from '@llm-101/ipc';
import supabase, { getAuthToken } from '@/lib/supabase/client';

const debug = Debug('popup:contexts:auth:AuthProvider');

export interface AuthProviderContext {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

const UserContext = createContext<AuthProviderContext>({
  user: null,
  session: null,
  isLoading: true,
});

export interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children, ...others }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncSession = useCallback(
    // async (event, new_session) => {
    async (event: AuthChangeEvent, new_session: Session | null) => {
      /*
        We did this condition cuz of this 'onAuthStateChange' function is triggered
        Whenever the user changes the browser tab!
        So - we do not do anything if the session is not changed!
      */
      if (session?.access_token != new_session?.access_token) {
        setSession(new_session);
        setUser(new_session?.user ?? null);
        setIsLoading(false);
      }
      sendChromeMessageIPC({
        type: event,
        data: {
          from: 'swiftstyleai.com-popup',
          session: new_session,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session],
  );

  const initSession = useCallback(async () => {
    // https://supabase.com/docs/reference/javascript/auth-setsession
    try {
      const sessionData = await getAuthToken({
        supabaseUrl: SUPABASE_URL,
        url: APP_URL,
      });

      if (!sessionData || !sessionData.value) {
        debug('not found access_token or refresh_token');
        sendChromeMessageIPC({
          type: 'SIGNED_OUT',
          data: {
            from: 'swiftstyleai.com-popup',
          },
        });
        return;
      }

      const { error, data: _ } = await supabase.auth.setSession({
        access_token: sessionData.value.access_token,
        refresh_token: sessionData.value.refresh_token,
      });

      if (error) {
        console.error('Error setting session:', error);
      }
    } catch (err) {
      debug(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // https://github.com/supabase/supabase-js/issues/442
    const { data: authListener } =
      supabase.auth.onAuthStateChange(syncSession);

    return () => {
      authListener?.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncSession]);

  useEffect(() => {
    initSession();
  }, []);

  const value = {
    session,
    user,
    isLoading,
  };

  return (
    <UserContext.Provider value={value} {...others}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
