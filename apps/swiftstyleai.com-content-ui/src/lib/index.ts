export function isInAllowlist(list: string[]) {
  // Get the current URL
  const currentURL = window.location.href;

  // Check if the current URL starts with any URL in the allowlist
  return list.some((allowlistURL) => currentURL.startsWith(allowlistURL));
}
