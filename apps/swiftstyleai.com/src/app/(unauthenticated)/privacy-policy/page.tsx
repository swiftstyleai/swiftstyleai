import { type Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import { HeaderPage } from '@/components/ui/page';
import Section from '@/components/ui/section';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';

import Footer from '../components/Footer';
import Header from '../components/Header';

const title = `Privacy Policy | ${siteConfig.title}`;
const description = 'How we store and use your personal information';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata(): Promise<Metadata> {
  // https://github.com/vercel/next.js/discussions/50189#discussioncomment-6899338
  const xUrl = headers().get('x-url') ?? siteConfig.url;
  const url = new URL(xUrl);

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

// <script type="application/ld+json">
//   {
//     "@context": "https://schema.org",
//     "@type": "SoftwareApplication",
//     "name": "Aptakube",
//     "operatingSystem": ["Windows", "macOS", "Linux"],
//     "applicationCategory": "DeveloperApplication",
//     "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "ratingCount": "21" },
//     "offers": { "@type": "Offer", "price": "9.90", "priceCurrency": "USD" }
//   }
// </script>

const PrivacyPolicyPage = () => {
  return (
    <>
      <Header />
      <Section>
        {/* Page Header */}
        <HeaderPage
          title='Privacy Policy'
          description={
            <>
              <strong>Last Updated and Effective Date:</strong> August 15, 2023
            </>
          }
          className='pt-24 pb-12'
        />

        {/* Privacy Content */}
        <article className='prose-md prose prose-stone dark:prose-invert sm:prose-lg'>
          <p>
            {siteConfig.title} adheres to the principles of data protection as
            set out in the EU General Data Protection Regulation (GDPR) 2018.
            This Privacy Policy outlines how we handle information we learn
            about you from your visit to our website.
          </p>

          <h2 id='1-information-we-collect'>1. Information We Collect</h2>
          <p>
            The information we receive depends upon what you do when visiting
            our site. When you visit our website, we generally collect
            information at two levels:
          </p>
          <ul>
            <li>
              Non-personal information collected as you browse our website.
            </li>
            <li>Personal information you knowingly provide us.</li>
          </ul>

          <h2 id='2-non-personal-information'>2. Non-Personal Information</h2>
          <p>
            This is information that is not associated with a specific personal
            identity. We collect and analyze web statistics using Google
            Analytics to better understand the high-level profile and activity
            of visitors to the website. This helps us develop our content to
            suit market demands.
          </p>
          <p>
            We also use <strong>cookies</strong> on our website. A cookie is a
            small, encrypted data string our server writes to your hard drive
            that contains your unique user ID. A cookie cannot be used to access
            or otherwise compromise the data on your hard drive. We use
            third-party advertising companies to serve ads when you visit our
            website. These companies may use information (not including personal
            information) about your visits to this and other websites to provide
            advertisements about goods and services of interest to you.
            Third-party vendors, including Google, use cookies to serve ads
            based on your previous visits to this website or other websites.
            Google&apos;s use of advertising cookies enables it and its partners
            to serve ads based on your visit to this site and/or other sites on
            the Internet. You may opt out of personalized advertising by
            visiting{' '}
            <Link href='https://www.google.com/settings/ads'>
              Google&apos;s Ads Settings
            </Link>
            .
          </p>
          <p>
            <Link href='/cookie-policy'>See our Cookie Policy here.</Link>
          </p>
          <p>
            <strong>IP addresses</strong> are not linked to personally
            identifiable information. We only use IP addresses to analyze
            trends, administer our website, track general user movements, and
            gather broad demographic information for aggregate use.
          </p>

          <h2 id='3-personal-information'>3. Personal Information</h2>
          <p>
            This is information associated with your name or personal identity.
            This information is only collected when you contact us via our{' '}
            <Link href='/contact'>contact page</Link>. The type of information
            you provide may include your name, email address, and other contact
            information. We may use the personal information we collect only to
            respond to your inquiries about our offerings.
          </p>

          <h2 id='4-sharing-of-information-with-other-parties'>
            4. Sharing of Information with Other Parties
          </h2>
          <p>
            We will not sell, rent, or lease your personal information to
            others. We will not share your personal information with third
            parties except in response to your specific request to do so.
          </p>

          <h2 id='5-keeping-your-information-secure'>
            5. Keeping Your Information Secure
          </h2>
          <p>
            {siteConfig.title} is committed to protecting the information you
            provide to us. We take all reasonable security measures to protect
            personal information from loss, unauthorized access, destruction,
            misuse, modification, or disclosure. As far as permissible under
            law, we accept no responsibility for any unauthorized access to
            information held by us.
            <br />
            <br />
            Please note that this Privacy Statement may be updated from time to
            time. If you have any questions about this document or our terms of
            use, please <Link href='/contact'>contact us</Link>.
          </p>
        </article>
      </Section>

      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
