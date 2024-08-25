import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import env from '@/constant/server';

export async function updateSession(request: NextRequest) {
  // https://github.com/vercel/next.js/discussions/50189#discussioncomment-6899338
  request.headers.set('x-url', request.url);

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Initialize Supabase client with SSR capabilities
    const supabase = createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            // console.log(
            //   `updateSession: get(name = ${name})`,
            //   request.cookies.get(name)?.value
            // );
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // console.log(
            //   `updateSession: set(name: ${name}, value: ${value}, options: ${JSON.stringify(
            //     options
            //   )}))`
            // );
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            // console.log(
            //   `updateSession: remove(name: ${name}, options: ${JSON.stringify(
            //     options
            //   )}))`
            // );
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // https://github.com/orgs/supabase/discussions/21468#discussioncomment-9218830
    // Retrieve user data from Supabase
    const { data, error } = await supabase.auth.getUser();

    // Redirect authenticated users away from the sign-in page
    if (request.nextUrl.pathname.startsWith('/signin') && !error) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user data is found, add user info to request headers
    if (data?.user) {
      const requestHeaders = new Headers(request.headers);
      if (data.user.id) {
        requestHeaders.set('user-id', data.user.id);
      }
      if (data.user.email) {
        requestHeaders.set('user-email', data.user.email);
      }
      // Rewrite request with new headers containing user information
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return response;
  } catch (e) {
    console.error('Failed to create Supabase client or retrieve user data:', e);

    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.

    // Return response with existing headers if Supabase client creation fails
    return response;
  }
}
