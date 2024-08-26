// https://github.com/supabase/supabase-js/blob/51cd9863af6510d5a3e87166c8cd54f94ee76da3/src/SupabaseClient.ts#L85
export function getAuthTokenKey(url: string): string {
  const hostname = new URL(url).hostname; // Extract the hostname from the URL
  const parts = hostname.split('.'); // Split the hostname by dots

  // Join the relevant parts to create the token
  const token = `sb-${parts[0]}-auth-token`;
  return token;
}

export function getAuthTokenVerifierKey(url: string): string {
  return `${getAuthTokenKey(url)}-code-verifier`;
}
