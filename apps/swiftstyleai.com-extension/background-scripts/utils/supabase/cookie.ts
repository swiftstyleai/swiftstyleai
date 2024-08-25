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

  let sessionData;
  try {
    sessionData = JSON.parse(parsedCookie[authToken]);
  } catch (error) {
    console.error('Failed to parse session data', error);
    sessionData = null;
  }

  return {
    ...cookie,
    value: sessionData,
  };
}
