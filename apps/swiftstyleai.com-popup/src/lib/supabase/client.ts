import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/constants';
import { createClient as createBrowserClient } from '@supabase/supabase-js';
import { parse as cookieParse } from 'cookie';
import { getCookies, getAuthTokenKey } from '@llm-101/cookies';

export async function getAuthToken({
  supabaseUrl,
  url,
}: {
  supabaseUrl: string;
  url: string;
}) {
  const authToken = getAuthTokenKey(supabaseUrl);
  const cookie = await getCookies({ url, name: authToken });
  if (!cookie) return null;
  const parsedCookie = cookieParse(`${authToken}=${cookie.value}`);
  const sessionData = JSON.parse(parsedCookie[authToken]);
  return {
    ...cookie,
    value: sessionData,
  };
}

const client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Whether to persist a logged-in session to storage. Defaults to true.
    persistSession: false,
  },
});

export default client;
