import { ArrowLeft, ChevronRight } from 'lucide-react';
import { type Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { dateFormat } from '@/lib/format/date';
import { FrontMatterResult } from '@/lib/mdx/front-matter';
import { CustomMDX } from '@/lib/mdx/MDXRemote';
import { openGraph } from '@/lib/og';
import { Link } from '@/lib/react-transition-progress/next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardHeader, CardImage } from '@/components/ui/card';
import Section from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';
import {
  filterLangBlogPosts,
  getBlogPost,
  getBlogPosts,
  getRelatedBlogPost,
  sortBlogPosts,
} from '@/db/mdx/blogs';
import { type Metadata as BlogMetadata } from '@/db/mdx/types';

import { getInitials } from './utils';
import EmptyState from '../components/EmptyState';
// import Card from './Card';
import Footer from '../../components/Footer';
import Navbar from '../../components/Header';

export type BlogPostProps = {
  readonly params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: BlogPostProps): Promise<Metadata | undefined> => {
  const currentPath = params.slug;
  const post = await getBlogPost(currentPath);

  if (!post) {
    return;
  }

  const { title, description, publishedDate, updatedDate, author, cover } =
    post.metadata;

  const ogImage = cover ? cover.src : openGraph({ title });
  // https://github.com/vercel/next.js/discussions/50189#discussioncomment-6899338
  const xUrl = headers().get('x-url') ?? siteConfig.url;
  const url = new URL(xUrl);

  return {
    title,
    description: description,
    alternates: {
      canonical: url.href,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date(publishedDate).toISOString(),
      modifiedTime: updatedDate
        ? new Date(updatedDate).toISOString()
        : undefined,
      url: new URL(`/blogs/${currentPath}`, deploymentURL),
      authors: author?.name || 'Unknown Author',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: `@${env.NEXT_PUBLIC_X_USERNAME}`,
      site: `@${env.NEXT_PUBLIC_X_USERNAME}`,
    },
  };
};

{
  /*
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Load testing Kubernetes clients without breaking the bank",
  "image": "https://aptakube.com/images/blogcover/load-testing-kubernetes-clients-without-breaking-the-bank.png",
  "publisher": {
    "@type": "Organization",
    "name": "Aptakube",
    "url": "https://aptakube.com",
    "logo": "https://aptakube.com/images/logo.png"
  },
  "url": "https://aptakube.com/blog/load-testing-kubernetes-clients-without-breaking-the-bank",
  "datePublished": "2024-06-24T12:00:00.000Z",
  "dateCreated": "2024-06-24T12:00:00.000Z",
  "dateModified": "2024-06-24T12:00:00.000Z",
  "description": "It's possible to have 20.000 Pods on a $15/mo VM. Do you want to know how?",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://aptakube.com/blog/"
  }
}
  </script>
*/
}

function getCover(post: FrontMatterResult<BlogMetadata>) {
  const { title, cover } = post.metadata;
  if (cover) {
    return cover.src;
  }
  return openGraph({ title });
}

export default async function Blog({ params }: BlogPostProps) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return notFound();
  }

  const allBlogs = await getBlogPosts();
  const sortedBlogs = sortBlogPosts(allBlogs);
  const enBlogs = filterLangBlogPosts(sortedBlogs, 'en');
  const relatedBlogPost = await getRelatedBlogPost(enBlogs, params.slug);

  return (
    <>
      <Navbar />

      <Section className='py-10'>
        <Link
          className='detail_back flex items-center gap-2 text-sm w-[-moz-fit-content] w-fit transition-[color] duration-150 ease-in-out mb-16 rounded-sm hover:opacity-80'
          href='/blogs'
        >
          <ArrowLeft className='text-[currentcolor] w-3.5 h-3.5' />
          Back to Blog
        </Link>
        {/* <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1> */}
        {/* <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
      </div> */}
        {/* <!-- Header --> */}
        <div className='flex flex-col items-center justify-center'>
          <div className='m-auto w-full text-center md:w-7/12'>
            <p className='m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base'>
              {dateFormat(post.metadata.updatedDate) ||
                dateFormat(post.metadata.publishedDate)}
            </p>
            <h1 className='mb-5'>{post.metadata.title}</h1>
            <p className='text-md m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg'>
              {post.metadata.description}
            </p>
          </div>
          {post.metadata.author && (
            <>
              {post.metadata.author.x && (
                <Link
                  href={post.metadata.author.x}
                  rel='noreferrer'
                  target='_blank'
                >
                  <div className='my-4 flex items-center'>
                    <Avatar className='relative h-8 w-8 md:h-12 md:w-12'>
                      <AvatarImage
                        src={post.metadata.author.avatar}
                        alt={post.metadata.author.name}
                      />
                      <AvatarFallback>
                        {getInitials(post.metadata.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='ml-3 text-md dark:text-white md:text-lg'>
                      by{' '}
                      <span className='font-semibold'>
                        {post.metadata.author.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )}
              {!post.metadata.author.x && (
                <div className='my-8 flex items-center'>
                  <Avatar className='relative h-8 w-8 md:h-12 md:w-12'>
                    <AvatarImage
                      src={post.metadata.author.avatar}
                      alt={post.metadata.author.name}
                    />
                    <AvatarFallback>
                      {getInitials(post.metadata.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-3 text-md dark:text-white md:text-lg'>
                    by{' '}
                    <span className='font-semibold'>
                      {post.metadata.author.name}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* <!-- End Header --> */}

        {/* <!-- Cover --> */}

        {post.metadata.cover && (
          <div className='relative m-auto mb-10 h-80 max-w-screen-lg overflow-hidden md:mb-20 md:h-150 w-full md:rounded-2xl'>
            <Image
              alt={post.metadata.cover.alt}
              width={post.metadata.cover.width}
              height={post.metadata.cover.height}
              className='h-full w-full object-cover duration-700 ease-in-out scale-100 blur-0'
              src={post.metadata.cover.src}
              style={{
                color: 'transparent',
              }}
            />
          </div>
        )}

        {/* <!-- End Cover --> */}

        <article className='prose-md prose prose-stone m-auto dark:prose-invert sm:prose-lg'>
          <CustomMDX source={post.body} />
        </article>

        {/* <div className='relative mb-20 mt-10 sm:mt-20'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='w-full border-t border-stone-300 dark:border-stone-700'></div>
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400'>
              Continue Reading
            </span>
          </div>
        </div> */}

        {/* <div className='mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3'>
          <Card />

          <Link href='/nextjs-conf'>
            <div className='ease overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800'>
              <img
                alt='Next.js Conf 2021'
                loading='lazy'
                width='500'
                height='400'
                decoding='async'
                data-nimg='1'
                className='h-64 w-full object-cover duration-700 ease-in-out scale-100 blur-0'
                srcSet='https://demo.vercel.pub/_next/image?url=https%3A%2F%2Fpublic.blob.vercel-storage.com%2FeEZHAoPTOBSYGBE3%2Fjm5fOz2-qN7ahbTIghRIDpXoNZgLsGLVfxA3k0.png&amp;w=640&amp;q=75 1x, https://demo.vercel.pub/_next/image?url=https%3A%2F%2Fpublic.blob.vercel-storage.com%2FeEZHAoPTOBSYGBE3%2Fjm5fOz2-qN7ahbTIghRIDpXoNZgLsGLVfxA3k0.png&amp;w=1080&amp;q=75 2x'
                src='https://demo.vercel.pub/_next/image?url=https%3A%2F%2Fpublic.blob.vercel-storage.com%2FeEZHAoPTOBSYGBE3%2Fjm5fOz2-qN7ahbTIghRIDpXoNZgLsGLVfxA3k0.png&amp;w=1080&amp;q=75'
                style={{
                  color: 'transparent',
                }}
              />
              <div className='h-36 border-t border-stone-200 px-5 py-8 dark:border-stone-700 dark:bg-black'>
                <h3 className='font-title text-xl tracking-wide dark:text-white'>
                  Next.js Conf 2021
                </h3>
                <p className='text-md my-2 truncate italic text-stone-600 dark:text-stone-400'>
                  The next Web is faster, more collaborative, more personalized,
                  and built by you. We’re throwing a party for Next.js as it
                  turns 5—have you claimed your ticket?
                </p>
                <p className='my-2 text-sm text-stone-600 dark:text-stone-400'>
                  Published Jan 13, 2022
                </p>
              </div>
            </div>
          </Link>

          <Link href='/vercel-is-now-bercel'>
            <div className='ease overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800'>
              <img
                alt='Vercel is now Bercel'
                loading='lazy'
                width='500'
                height='400'
                decoding='async'
                data-nimg='1'
                className='h-64 w-full object-cover duration-700 ease-in-out scale-100 blur-0'
                srcSet='https://demo.vercel.pub/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fvercel-platforms%2Fimage%2Fupload%2Fv1642719935%2Fukpackcfmrpzi7ylawmw.png&amp;w=640&amp;q=75 1x, https://demo.vercel.pub/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fvercel-platforms%2Fimage%2Fupload%2Fv1642719935%2Fukpackcfmrpzi7ylawmw.png&amp;w=1080&amp;q=75 2x'
                src='https://demo.vercel.pub/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fvercel-platforms%2Fimage%2Fupload%2Fv1642719935%2Fukpackcfmrpzi7ylawmw.png&amp;w=1080&amp;q=75'
                style={{
                  color: 'transparent',
                }}
              />
              <div className='h-36 border-t border-stone-200 px-5 py-8 dark:border-stone-700 dark:bg-black'>
                <h3 className='font-title text-xl tracking-wide dark:text-white'>
                  Vercel is now Bercel
                </h3>
                <p className='text-md my-2 truncate italic text-stone-600 dark:text-stone-400'>
                  Today, we have some very special news regarding the evolution
                  of our company. Vercel is now Bercel.
                </p>
                <p className='my-2 text-sm text-stone-600 dark:text-stone-400'>
                  Published Jan 12, 2022
                </p>
              </div>
            </div>
          </Link>
        </div> */}

        <div className='px-4 pt-10 md:pt-20 pb-4 md:pb-8 sm:px-6 md:px-8 mx-auto'>
          <div className='max-w-2xl text-center mx-auto mb-10 lg:mb-14'>
            <h2 className='text-2xl font-bold md:text-4xl md:leading-tight dark:text-white'>
              Read our latest news
            </h2>
            {/* <p className="mt-1 text-gray-600 dark:text-neutral-400">We've helped some great companies brand, design and get to market.</p> */}
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {relatedBlogPost.map((post) => (
              <Link
                href={`/blogs/${post.metadata.permalink}/`}
                className='group flex flex-col focus:outline-none border-none'
                key={`blogs-${post.metadata.permalink}`}
              >
                <CardImage src={getCover(post)}>
                  {/* <span className='absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900'>
                  Sponsored
                </span> */}
                </CardImage>
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

            {/* <a className='group flex flex-col focus:outline-none' href='#'>
              <div className='relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden'>
                <img
                  className='size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl'
                  src='https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80'
                  alt='Blog Image'
                />
                <span className='absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900'>
                  Sponsored
                </span>
              </div>

              <div className='mt-7'>
                <h3 className='text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white'>
                  Studio by Preline
                </h3>
                <p className='mt-3 text-gray-800 dark:text-neutral-200'>
                  Produce professional, reliable streams easily leveraging
                  Preline's innovative broadcast studio
                </p>
                <p className='mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500'>
                  Read more
                  <svg
                    className='shrink-0 size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m9 18 6-6-6-6' />
                  </svg>
                </p>
              </div>
            </a> */}

            {/* <a className='group flex flex-col focus:outline-none' href='#'>
              <div className='relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden'>
                <img
                  className='size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl'
                  src='https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80'
                  alt='Blog Image'
                />
              </div>

              <div className='mt-7'>
                <h3 className='text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white'>
                  Onsite
                </h3>
                <p className='mt-3 text-gray-800 dark:text-neutral-200'>
                  Optimize your in-person experience with best-in-class
                  capabilities like badge printing and lead retrieval
                </p>
                <p className='mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500'>
                  Read more
                  <svg
                    className='shrink-0 size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m9 18 6-6-6-6' />
                  </svg>
                </p>
              </div>
            </a> */}

            {/* <a
              className="group relative flex flex-col w-full min-h-60 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80')] bg-center bg-cover rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition"
              href='#'
            >
              <div className='flex-auto p-4 md:p-6'>
                <h3 className='text-xl text-white/90 group-hover:text-white'>
                  <span className='font-bold'>Preline</span> Press publishes
                  books about economic and technological advancement.
                </h3>
              </div>
              <div className='pt-0 p-4 md:p-6'>
                <div className='inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70 group-focus:text-white/70'>
                  Visit the site
                  <svg
                    className='shrink-0 size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m9 18 6-6-6-6' />
                  </svg>
                </div>
              </div>
            </a> */}
          </div>
          {relatedBlogPost.length === 0 && <EmptyState />}
        </div>
      </Section>

      <Footer />
    </>
  );
}
