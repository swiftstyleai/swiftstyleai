import { type Metadata } from 'next';
import { headers } from 'next/headers';

import ColorLogo from '@/components/logo/ColorLogo';
import LoginForm from '@/components/SigninPage/Form';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';

// Title and description for metadata
const title = `Sign In | ${siteConfig.title}`;
const description =
  'Access your SwiftStyle AI account. Sign in to customize your content and manage your settings.';

export async function generateMetadata(): Promise<Metadata> {
  // Get the current URL from headers
  const url = new URL(headers().get('x-url')!);

  return {
    title,
    description,
    alternates: {
      canonical: url.href,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: siteConfig.title,
      url: url.href,
      images: [`${deploymentURL}/images/og.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: `@${env.NEXT_PUBLIC_X_USERNAME}`,
      images: [`${deploymentURL}/images/og.jpg`],
      site: `@${env.NEXT_PUBLIC_X_USERNAME}`,
    },
  };
}

export default function SignInPage() {
  return (
    <main className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <ColorLogo
          className='mx-auto'
          width={128}
          height={128}
          animation='breath'
        />
        <h2 className='mt-2 text-center text-2xl font-bold leading-9 tracking-tight'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <LoginForm />
      </div>
    </main>
  );
}
