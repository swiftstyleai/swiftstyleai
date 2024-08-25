import { type Metadata } from 'next';
import { headers } from 'next/headers';

import FAQSections from '@/components/HomePage/components/FAQSections';
import HeroSections from '@/components/HomePage/components/HeroSections';
import HowItWorksSections from '@/components/HomePage/components/HowItWorksSections';
import PricingSections from '@/components/HomePage/components/PricingSections';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';

import Footer from './components/Footer';
import Header from './components/Header';

const title = `${siteConfig.title} | Tailor Content to Your Unique Voice`;
const description = siteConfig.description;

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

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSections />
      <HowItWorksSections />
      <PricingSections />
      <FAQSections />
      <Footer />
    </>
  );
}
