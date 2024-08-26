export const isBrowserEnv = () => (typeof window !== 'undefined' && window.navigator);

export const isChromeExtensionEnv = () => (typeof chrome !== 'undefined' && chrome.runtime);
