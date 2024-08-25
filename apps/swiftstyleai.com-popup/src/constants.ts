export const APP_URL = import.meta.env['VITE_APP_URL'];
export const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'];
export const SUPABASE_ANON_KEY = import.meta.env['VITE_SUPABASE_ANON_KEY'];
export const VITE_APPNAME = import.meta.env['VITE_APPNAME'];
export const DEBUG = import.meta.env['VITE_DEBUG'];

export const COOKIE_ACCESS_TOKEN = 'access-token';
export const REFRESH_ACCESS_TOKEN = 'refresh-token';

export const siteConfig = {
  title: VITE_APPNAME || 'SwiftStyle AI',
  description:
    'SwiftStyle AI tailors content to your unique style, ensuring every piece reflects your personal or brand voice.',
};
