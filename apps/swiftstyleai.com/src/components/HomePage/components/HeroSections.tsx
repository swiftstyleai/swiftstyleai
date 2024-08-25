import { Link } from '@/lib/react-transition-progress/next';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

import { siteConfig } from '@/constant/config';
import env from '@/constant/server';

export default function HeroSections() {
  return (
    <div
      className={`
      relative
      overflow-hidden
      before:absolute
      before:top-0
      before:start-1/2
      before:bg-[url('/svg/squared-bg-element.svg')]
      dark:before:bg-[url('/svg/squared-bg-dark-element.svg')]
      before:bg-no-repeat before:bg-top before:size-full before:-z-[1]
      before:transform
      before:-translate-x-1/2
      md:h-[calc(100vh-106px)]
      `}
    >
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24'>
        {/* <div className='flex justify-center'>
          <a
            className='inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-400'
            href='#'
          >
            Explore the Capital Product
            <span className='flex items-center gap-x-1'>
              <span className='border-s border-gray-200 text-blue-600 ps-2 dark:text-blue-500 dark:border-neutral-700'>
                Explore
              </span>
              <svg
                className='flex-shrink-0 size-4 text-blue-600'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m9 18 6-6-6-6' />
              </svg>
            </span>
          </a>
        </div> */}

        <div className='mt-5 max-w-xl text-center mx-auto'>
          <Typography variant='h1'>
            Custom Content Creation Assistant
          </Typography>
        </div>

        <div className='mt-5 max-w-3xl text-center mx-auto'>
          <p className='text-lg text-gray-600 dark:text-neutral-400'>
            {siteConfig.title} tailors content to your unique style, ensuring
            every piece reflects your personal or brand voice.
          </p>
        </div>

        <div className='mt-8 gap-3 flex justify-center'>
          <Button size='lg' asChild className='rounded-full px-4'>
            <Link href={env.NEXT_PUBLIC_CHROME_EXTENSIONS} target='_blank'>
              Get Started for Free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
