import React from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import { HeaderPage } from '@/components/ui/page';
import Section from '@/components/ui/section';

import { siteConfig } from '@/constant/config';

import Footer from '../components/Footer';
import Header from '../components/Header';

const email = 'namvhoang02@gmail.com';

import { type Metadata } from 'next';
import { headers } from 'next/headers';

import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';

// Title and description for metadata
const title = 'Cookie Policy | SwiftStyle AI';
const description =
  'Understand how SwiftStyle AI uses cookies to enhance your experience on our website. Learn more about the cookies we set and how you can manage them.';

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

const CookiePolicyPage = () => {
  return (
    <>
      <Header />

      <Section>
        {/* Page Header */}
        <HeaderPage
          title='Cookie Policy'
          description={
            <>
              This is the Cookie Policy for {siteConfig.title}, accessible from
              <a href={siteConfig.url}> {siteConfig.url}</a>.
            </>
          }
          className='pt-24 pb-12'
        />

        {/* Main Content */}
        <article className='prose-md prose prose-stone dark:prose-invert sm:prose-lg'>
          <h2>What Are Cookies</h2>
          <p>
            As is common practice with almost all professional websites, this
            site uses cookies, which are tiny files that are downloaded to your
            computer, to improve your experience. This page describes what
            information they gather, how we use it, and why we sometimes need to
            store these cookies. We will also share how you can prevent these
            cookies from being stored, however, this may downgrade or
            &apos;break&apos; certain elements of the site&apos;s functionality.
          </p>

          <h2>How We Use Cookies</h2>
          <p>
            We use cookies for a variety of reasons detailed below.
            Unfortunately, in most cases, there are no industry-standard options
            for disabling cookies without completely disabling the functionality
            and features they add to this site. It is recommended that you leave
            on all cookies if you are not sure whether you need them or not, in
            case they are used to provide a service that you use.
          </p>

          <h2>Disabling Cookies</h2>
          <p>
            You can prevent the setting of cookies by adjusting the settings on
            your browser (see your browser&apos;s Help for how to do this). Be
            aware that disabling cookies will affect the functionality of this
            and many other websites that you visit. Disabling cookies will
            usually result in also disabling certain functionality and features
            of this site. Therefore, it is recommended that you do not disable
            cookies. This Cookies Policy was created with the help of the{' '}
            <a href='https://www.cookiepolicygenerator.com/cookie-policy-generator/'>
              Cookies Policy Generator
            </a>
            .
          </p>

          <h2>The Cookies We Set</h2>
          <ul>
            <li>
              <h3>Account Related Cookies</h3>
              <p>
                If you create an account with us, then we will use cookies for
                the management of the signup process and general administration.
                These cookies will usually be deleted when you log out, however,
                in some cases, they may remain afterward to remember your site
                preferences when logged out.
              </p>
            </li>

            <li>
              <h3>Login Related Cookies</h3>
              <p>
                We use cookies when you are logged in so that we can remember
                this fact. This prevents you from having to log in every single
                time you visit a new page. These cookies are typically removed
                or cleared when you log out to ensure that you can only access
                restricted features and areas when logged in.
              </p>
            </li>

            <li>
              <h3>Forms Related Cookies</h3>
              <p>
                When you submit data through a form such as those found on
                contact pages or comment forms, cookies may be set to remember
                your user details for future correspondence.
              </p>
            </li>
          </ul>

          <h2>Third Party Cookies</h2>
          <p>
            In some special cases, we also use cookies provided by trusted third
            parties. The following section details which third party cookies you
            might encounter through this site.
          </p>

          <ul>
            <li>
              <h3>Google Analytics</h3>
              <p>
                This site uses Google Analytics, which is one of the most
                widespread and trusted analytics solutions on the web, for
                helping us to understand how you use the site and ways that we
                can improve your experience. These cookies may track things such
                as how long you spend on the site and the pages that you visit
                so we can continue to produce engaging content.
              </p>
              <p>
                For more information on Google Analytics cookies, see the
                official{' '}
                <a href='https://support.google.com/analytics/answer/6004245'>
                  Google Analytics page
                </a>
                .
              </p>
            </li>
          </ul>

          <h2>More Information</h2>
          <p>
            Hopefully, that has clarified things for you. As was previously
            mentioned, if there is something that you aren&apos;t sure whether
            you need or not, it&apos;s usually safer to leave cookies enabled in
            case it does interact with one of the features you use on our site.
          </p>
          <p>
            For more general information on cookies, please read the{' '}
            <a href='https://www.cookiepolicygenerator.com/sample-cookies-policy/'>
              Cookies Policy article
            </a>
            .
          </p>
          <p>
            However, if you are still looking for more information, then you can
            contact us through one of our preferred contact methods:
          </p>
          <ul>
            <li>
              Email: <Link href={`mailto:${email}`}>{email}</Link>
            </li>
          </ul>
        </article>
      </Section>

      <Footer />
    </>
  );
};

export default CookiePolicyPage;
