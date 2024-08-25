import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { getCachedServerUser } from '@/lib/auth/server';
import { GoogleAnalytics } from '@/lib/ga';
import MSClarity from '@/lib/ms-clarity';
import {
  ProgressBar,
  ProgressBarProvider,
} from '@/lib/react-transition-progress';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';
import { AppProvider } from '@/contexts/app';
import { AuthProvider } from '@/contexts/auth/AuthProvider';

// import GlobalLinearProgress from './components/GlobalLinearProgress';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${deploymentURL}/images/og.jpg`],
    type: 'website',
    // locale: 'en_US',
    siteName: siteConfig.title,
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${deploymentURL}/images/og.jpg`],
    creator: `@${env.NEXT_PUBLIC_X_USERNAME}`,
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // https://github.com/Jaaneek/t3-supabase-app-router/blob/main/src/app/layout.tsx#L22
  const res = await getCachedServerUser();

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        {/* <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Aptakube',
              operatingSystem: ['Windows', 'macOS', 'Linux'],
              applicationCategory: 'DeveloperApplication',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                ratingCount: '21',
              },
              offers: { '@type': 'Offer', price: '9.90', priceCurrency: 'USD' },
            }),
          }}
        /> */}
        <React.Suspense>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <AppProvider>
              <TooltipProvider>
                <AuthProvider {...res}>
                  <ProgressBarProvider>
                    {children}
                    <ProgressBar
                      className='fixed h-1 shadow-lg shadow-sky-500/20 bg-primary top-0'
                      style={{
                        zIndex: 51,
                      }}
                    />
                  </ProgressBarProvider>
                  <Toaster />
                  {/* <GlobalLinearProgress /> */}
                  <GoogleAnalytics />
                  <MSClarity />
                </AuthProvider>
              </TooltipProvider>
            </AppProvider>
          </ThemeProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
