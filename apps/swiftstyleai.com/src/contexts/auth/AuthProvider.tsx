'use client';

import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { setCookies } from '@/lib/cookies/client';
import { createClient } from '@/lib/supabase/client';

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
  supabaseClient?: SupabaseClient;
  children?: React.ReactNode;
  user: User | null;
  session: Session | null;
  // [propName: string]: any;
}

export const AuthProvider = ({
  supabaseClient = createClient(),
  children,
  user: initialUser,
  session: initialSession,
  ...others
}: Props) => {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);

  const syncSession = useCallback(
    // async (event, new_session) => {
    async (_: AuthChangeEvent, new_session: Session | null) => {
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
      setCookies(new_session);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  );

  useEffect(() => {
    // https://github.com/supabase/supabase-js/issues/442
    const { data: authListener } =
      supabaseClient.auth.onAuthStateChange(syncSession);

    return () => {
      authListener?.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncSession]);

  useEffect(() => {
    (async () => {
      const { data } = await supabaseClient.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
      setCookies(data.session);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
