// https://github.com/Jaaneek/t3-supabase-app-router/blob/main/src/utils/auth.ts
import { type Session, type User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';

// Function to set the session using Supabase
export const setSupabaseSession = async (
  accessToken: string,
  refreshToken: string
) => {
  const supabase = createClient();
  const { error, data } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    console.error('Error setting session:', error);
    return {
      user: null,
      session: null,
    };
  }

  return data;
};

export const getServerUser = async (
  accessToken?: string,
  refreshToken?: string
): Promise<{ user: User | null; session: Session | null }> => {
  // If accessToken or refreshToken is not provided, retrieve them from cookies
  if (!accessToken || !refreshToken) {
    const mappedCookies = cookies();
    accessToken = mappedCookies.get('access-token')?.value;
    refreshToken = mappedCookies.get('refresh-token')?.value;
  }

  if (!accessToken || !refreshToken) {
    return {
      user: null,
      session: null,
    };
  }

  return await setSupabaseSession(accessToken, refreshToken);
};

export const getCachedServerUser = cache(getServerUser);
