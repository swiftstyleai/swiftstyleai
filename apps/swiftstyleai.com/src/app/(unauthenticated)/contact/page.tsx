import { type Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeaderPage } from '@/components/ui/page';
import Section from '@/components/ui/section';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';

import Footer from '../components/Footer';
import Header from '../components/Header';

const email = 'namvhoang02@gmail.com';

// Title and description for metadata
const title = `Contact Us | ${siteConfig.title}`;
const description =
  'Get in touch with the SwiftStyle AI team. We’re here to assist with any issues, feedback, or suggestions to improve our app.';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata(): Promise<Metadata> {
  // https://github.com/vercel/next.js/discussions/50189#discussioncomment-6899338
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

const socialLinks = [
  { href: 'https://www.linkedin.com/in/namvhoang/', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/namhoang28/', label: 'Facebook' },
  { href: 'https://x.com/iamleohoang', label: 'Twitter' },
];

const ContactPage = () => {
  return (
    <>
      <Header />
      <Section className='flex flex-col items-start justify-start'>
        <HeaderPage
          title='Contact'
          description={
            <>
              <strong>Last Updated:</strong> August 13, 2024
            </>
          }
          className='pt-24 pb-12'
        />

        <article className='prose-md prose prose-stone dark:prose-invert sm:prose-lg'>
          <p>
            {siteConfig.title} customizes content to align with your unique
            style, ensuring each piece embodies your personal or brand voice.
          </p>
          <p>
            If you experience any issues while using the app, please reach out
            via email at{' '}
            <Link href={`mailto:${email}`} className='text-blue-600 underline'>
              {email}
            </Link>
            .
          </p>
          <p>
            We also welcome your suggestions for improvements or new features.
            Your feedback is invaluable and helps us enhance the app further.
          </p>
          <p>Thank you for using SwiftStyle AI!</p>
          <p>Leo Hoang</p>

          <p>
            <strong>Connect with me:</strong>
          </p>
          <div className='flex space-x-4'>
            {socialLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline'
              >
                {label}
              </Link>
            ))}
          </div>
        </article>

        <Avatar className='h-32 w-32 rounded-md mt-10'>
          <AvatarImage
            src='/images/avatars/leo-hoang@512x512.png'
            alt='Avatar of Leo Hoang'
          />
          <AvatarFallback className='rounded-md'>Leo Hoang</AvatarFallback>
        </Avatar>
      </Section>

      <Footer />
    </>
  );
};

export default ContactPage;
