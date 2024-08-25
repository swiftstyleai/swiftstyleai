import { type Session } from '@supabase/supabase-js';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export const setCookies = (session: Session | null) => {
  if (session) {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
    cookies.set('access-token', session.access_token, {
      path: '/',
      maxAge,
    });
    cookies.set('refresh-token', session.refresh_token, {
      path: '/',
      maxAge,
    });
  } else {
    cookies.remove('access-token');
    cookies.remove('refresh-token');
  }
};
