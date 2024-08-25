import z from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_APPNAME: z.string(),
  NEXT_PUBLIC_CHROME_EXTENSIONS: z.string(),
  GEMINI_API_KEY: z.string(),
  NEXT_PUBLIC_X_LINK: z.string(),
  NEXT_PUBLIC_X_USERNAME: z.string(),
  NEXT_PUBLIC_GITHUB_LINK: z.string(),
  NEXT_PUBLIC_MS_CLARITY_CODE: z.string(),
  NEXT_PUBLIC_MEDIUM_LINK: z.string(),
  NEXT_PUBLIC_TELEGRAM_LINK: z.string(),
});

const envServer = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APPNAME: process.env.NEXT_PUBLIC_APPNAME,
  NEXT_PUBLIC_CHROME_EXTENSIONS: process.env.NEXT_PUBLIC_CHROME_EXTENSIONS,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NEXT_PUBLIC_X_LINK: process.env.NEXT_PUBLIC_X_LINK,
  NEXT_PUBLIC_X_USERNAME: process.env.NEXT_PUBLIC_X_USERNAME,
  NEXT_PUBLIC_GITHUB_LINK: process.env.NEXT_PUBLIC_GITHUB_LINK,
  NEXT_PUBLIC_MS_CLARITY_CODE: process.env.NEXT_PUBLIC_MS_CLARITY_CODE,
  NEXT_PUBLIC_MEDIUM_LINK: process.env.NEXT_PUBLIC_MEDIUM_LINK,
  NEXT_PUBLIC_TELEGRAM_LINK: process.env.NEXT_PUBLIC_TELEGRAM_LINK,
});

if (!envServer.success) {
  // eslint-disable-next-line no-console
  console.error(envServer.error.issues);
  throw new Error('There is an error with the server environment variables');
}

const envServerSchema = envServer.data;

export default envServerSchema;
