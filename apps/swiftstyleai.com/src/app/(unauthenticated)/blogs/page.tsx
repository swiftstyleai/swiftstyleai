import { ChevronRight } from 'lucide-react';
import { type Metadata } from 'next';
import { headers } from 'next/headers';

import { Link } from '@/lib/react-transition-progress/next';

import { CardHeader, CardImage } from '@/components/ui/card';
import { HeaderPage } from '@/components/ui/page';
import Section from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';
import {
  filterLangBlogPosts,
  getBlogPosts,
  sortBlogPosts,
} from '@/db/mdx/blogs';

import Article from './components/Article';
import EmptyState from './components/EmptyState';
import { getCover } from './utils';
import Footer from '../components/Footer';
import Header from '../components/Header';

const title = `Blog | ${siteConfig.title}`;
const description = `Everything AI and the latest news about ${siteConfig.title}!`;

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
      creator: '@swiftstyleai',
      images: [`${deploymentURL}/images/og.jpg`],
      site: `@${env.NEXT_PUBLIC_X_USERNAME}`,
    },
  };
}

// <meta name="twitter:site" content="@aptakube" />

export default async function BlogPage() {
  const allBlogs = await getBlogPosts();
  const sortedBlogs = sortBlogPosts(allBlogs);
  const enBlogs = filterLangBlogPosts(sortedBlogs, 'en');

  const topStories = enBlogs.slice(0, 3);
  const allLatest = enBlogs.slice(3);

  return (
    <>
      <Header />

      <Section className='flex flex-col items-start justify-start'>
        <HeaderPage
          title='Blogs'
          description={`Everything AI and the latest news about ${siteConfig.title}!`}
          className='pt-24'
        />

        <div className='clearfix py-6' />

        <Typography variant='h2'>Top Stories</Typography>
        <div className='clearfix mb-4 sm:mb-5' />

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {topStories.map((post) => (
            <Link
              href={`/blogs/${post.metadata.permalink}/`}
              className='group flex flex-col focus:outline-none border-none'
              key={`blogs-${post.metadata.permalink}`}
            >
              <CardImage src={getCover(post)} />
              <CardHeader className='p-0 mt-7'>
                <Typography variant='h3'>{post.metadata.title}</Typography>
                <Typography className='typography-body2 mt-3 text-gray-600 dark:text-gray-400'>
                  {post.metadata.description}
                </Typography>
              </CardHeader>
              <p className='mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500'>
                Read more
                <ChevronRight className='text-[currentcolor] w-4 h-4' />
              </p>
            </Link>
          ))}
        </div>

        <div className='clearfix py-6' />

        <Typography variant='h2'>All the Latest</Typography>
        <div className='clearfix mb-4 sm:mb-5' />

        {allLatest.map((post) => (
          <Article
            key={`blogs-${post.metadata.permalink}`}
            title={post.metadata.title}
            description={post.metadata.description}
            publishedDate={post.metadata.publishedDate}
            permalink={post.metadata.permalink}
          />
        ))}

        {allLatest.length === 0 && <EmptyState />}
      </Section>

      <Footer />
    </>
  );
}
