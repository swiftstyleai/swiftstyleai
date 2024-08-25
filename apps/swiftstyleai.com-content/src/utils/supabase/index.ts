import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../constants';

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Whether to persist a logged-in session to storage. Defaults to true.
    persistSession: false,
  },
});

export default supabase;
