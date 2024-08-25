import { Check, X } from 'lucide-react';

import { Link } from '@/lib/react-transition-progress/next';

import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';

import { siteConfig } from '@/constant/config';
import env from '@/constant/server';

// Customize various character free
// Make friends with creative responses

const BASIC_FEATURES = [
  {
    // text: 'Get 300 free prompts monthly',
    text: 'Unlimited prompts monthly',
    available: true,
  },
  {
    // text: 'Create 5 characters for free',
    text: 'Unlimited character creation',
    available: true,
  },
  {
    text: 'One Click AI Reply',
    available: true,
  },
  {
    text: (
      <>
        Works with{' '}
        <Link href='https://x.com' target='_blank'>
          Twitter / X
        </Link>
      </>
    ),
    available: true,
  },
  {
    text: 'Chrome Extension',
    available: true,
  },
  {
    text: 'Community Support',
    available: true,
  },
  {
    text: '24/7 email support',
    // available: false,
    available: true,
  },
];

// const PREMIUM_FEATURES = [
//   {
//     text: 'Unlimited prompts monthly',
//     available: true,
//   },
//   {
//     text: 'Unlimited character creation',
//     available: true,
//   },
//   {
//     text: 'Community Support',
//     available: true,
//   },
//   {
//     text: '24/7 email support',
//     available: true,
//   },
// ];

const FeatureItem = ({
  text,
  available,
}: {
  text: string | JSX.Element;
  available: boolean;
}) => (
  <li className='flex space-x-3'>
    <span
      className={`mt-0.5 size-5 flex justify-center items-center rounded-full
      ${
        available
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500'
          : 'bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500'
      }`}
    >
      {available ? (
        <Check className='flex-shrink-0 size-3.5' />
      ) : (
        <X className='flex-shrink-0 size-3.5' />
      )}
    </span>
    <span className='text-gray-800 dark:text-neutral-200'>{text}</span>
  </li>
);

export default function PricingSections() {
  return (
    <Section id='pricing' className='overflow-hidden py-10 lg:pt-20'>
      <div className='mx-auto max-w-xl mb-8 lg:mb-14 text-center'>
        <Typography variant='h2'>
          Perfect Your Writing with {siteConfig.title}
        </Typography>
      </div>

      <div className='relative xl:w-10/12 xl:mx-auto'>
        {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'> */}
        <div className='w-full max-w-xl mx-auto grid grid-cols-1 gap-6 lg:gap-8'>
          <div className='p-4 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-neutral-900 dark:border-neutral-800'>
            <Typography variant='h4' className='font-bold'>
              Basic
            </Typography>
            <div className='text-sm text-gray-500 dark:text-neutral-500'>
              Start crafting content that matches your unique style.
            </div>

            <div className='mt-5'>
              <Typography variant='h1' className='font-bold' asChild>
                <span>Free</span>
              </Typography>
            </div>

            <div className='mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0'>
              <ul className='space-y-2 text-sm sm:text-base'>
                {BASIC_FEATURES.slice(0, 4).map((e, index) => (
                  <FeatureItem
                    key={index}
                    text={e.text}
                    available={e.available}
                  />
                ))}
              </ul>
              <ul className='space-y-2 text-sm sm:text-base'>
                {BASIC_FEATURES.slice(4, 8).map((e, index) => (
                  <FeatureItem
                    key={index}
                    text={e.text}
                    available={e.available}
                  />
                ))}
              </ul>
            </div>

            <div className='mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0'>
              <div />

              <div className='flex justify-end'>
                <Button size='lg' variant='outline'>
                  <Link
                    href={env.NEXT_PUBLIC_CHROME_EXTENSIONS}
                    target='_blank'
                    className='text-lg text-gray-800 dark:text-neutral-200 inline-flex items-center'
                  >
                    Get started
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* <div className='shadow-xl shadow-gray-200 p-5 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-gray-900/20'>
            <Typography variant='h4' className='font-bold'>
              Premium
            </Typography>
            <div className='text-sm text-gray-500 dark:text-neutral-500'>
              Unlock all features to ensure every piece meets your needs.
            </div>
            <span className='absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-white dark:text-neutral-800'>
              Most popular
            </span>

            <div className='mt-5'>
              <Typography variant='h1' className='font-bold' asChild>
                <span>$9</span>
              </Typography>
              <Typography variant='h4' className='font-bold' asChild>
                <span>.99</span>
              </Typography>
              <span className='ms-3 text-gray-500 dark:text-neutral-500'>
                USD / monthly
              </span>
            </div>

            <div className='mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0'>
              <ul className='space-y-2 text-sm sm:text-base'>
                {PREMIUM_FEATURES.slice(0, 3).map((e, index) => (
                  <FeatureItem
                    key={index}
                    text={e.text}
                    available={e.available}
                  />
                ))}
              </ul>
              <ul className='space-y-2 text-sm sm:text-base'>
                {PREMIUM_FEATURES.slice(3, 6).map((e, index) => (
                  <FeatureItem
                    key={index}
                    text={e.text}
                    available={e.available}
                  />
                ))}
              </ul>
            </div>

            <div className='mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0'>
              <div>
                <p className='text-sm text-gray-500 dark:text-neutral-500'>
                  Cancel anytime.
                </p>
                <p className='text-sm text-gray-500 dark:text-neutral-500'>
                  No card required.
                </p>
              </div>

              <div className='flex justify-end'>
                <Button size='lg' className='rounded-full'>
                  Start free trial
                </Button>
              </div>
            </div>
          </div> */}
        </div>

        <div className='hidden md:block absolute top-0 end-0 translate-y-16 translate-x-16'>
          <svg
            className='w-16 h-auto text-orange-500'
            width='121'
            height='135'
            viewBox='0 0 121 135'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164'
              stroke='currentColor'
              strokeWidth='10'
              strokeLinecap='round'
            />
            <path
              d='M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5'
              stroke='currentColor'
              strokeWidth='10'
              strokeLinecap='round'
            />
            <path
              d='M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874'
              stroke='currentColor'
              strokeWidth='10'
              strokeLinecap='round'
            />
          </svg>
        </div>

        <div className='hidden md:block absolute bottom-0 start-0 translate-y-16 -translate-x-16'>
          <svg
            className='w-56 h-auto text-cyan-500'
            width='347'
            height='188'
            viewBox='0 0 347 188'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426'
              stroke='currentColor'
              strokeWidth='7'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </div>

      {/* <div className='mt-7 text-center'>
        <p className='text-xs text-gray-400'>Prices in USD. Taxes may apply.</p>
      </div> */}
    </Section>
  );
}
