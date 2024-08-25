import { type CookieOptions, createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../constants';

let supabase = null;

export function createClient() {
  if (!supabase) {
    supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        // Whether to persist a logged-in session to storage. Defaults to true.
        persistSession: false,
      },
      isSingleton: true,
      cookies: {
        get(name: string) {
          console.log(name);
          return null;
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          console.log(name, options);
        },
      },
    });
  }

  return supabase;
}
