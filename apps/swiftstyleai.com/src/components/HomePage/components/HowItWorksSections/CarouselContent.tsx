'use client';

import { ArrowUpRight, MoveRight } from 'lucide-react';
import * as React from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from '@/components/ui/card';
import {
  CarouselContent as CarouselContentOrigin,
  CarouselItem as CarouselItemOrigin,
  useCarousel,
} from '@/components/ui/carousel';

import env from '@/constant/client';

export default function CarouselContent() {
  const { scrollTo } = useCarousel();

  const handleScrollTo = React.useCallback(
    (index: number) => {
      scrollTo(index);
    },
    [scrollTo]
  );

  return (
    <>
      <div className='aspect-w-16 aspect-h-9 lg:aspect-none'>
        <CarouselContentOrigin>
          <CarouselItemOrigin>
            <Card className='overflow-hidden w-full object-cover rounded-xl mt-8'>
              {/* alt='Product image' */}
              {/* className='aspect-square w-full rounded-md object-cover' */}
              {/* height='300' */}
              {/* src={src} */}
              {/* width='300' */}
              <CardImage src='/images/download-chrome-extension.png' />
              <CardHeader>
                <div className='grid gap-2'>
                  <CardTitle>1. Download the Chrome Extension:</CardTitle>
                  <CardDescription className='my-1'>
                    Click the "Get Started" button to download the extension
                    from the Chrome Web Store.
                  </CardDescription>
                  <Link
                    href={env.NEXT_PUBLIC_CHROME_EXTENSIONS}
                    target='_blank'
                    className='text-lg text-gray-800 dark:text-neutral-200 inline-flex items-center'
                  >
                    Get Started <MoveRight className='ml-2 h-4 w-4' />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </CarouselItemOrigin>
          <CarouselItemOrigin>
            <Card className='overflow-hidden w-full object-cover rounded-xl mt-8'>
              <CardImage src='/images/generate-content.gif' />
              <CardHeader>
                <div className='grid gap-2'>
                  <CardTitle>2. Generate Content:</CardTitle>
                  <CardDescription className='my-1'>
                    Click the SwiftStyle AI button to generate content. To
                    ensure the content matches your style, you can pre-select
                    the character that best fits your needs.
                  </CardDescription>
                  <Link
                    href='#'
                    className='text-lg text-gray-800 dark:text-neutral-200 inline-flex items-center'
                  >
                    Learn more <MoveRight className='ml-2 h-4 w-4' />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </CarouselItemOrigin>
          <CarouselItemOrigin>
            <Card className='overflow-hidden w-full object-cover rounded-xl mt-8'>
              <CardImage src='/images/finalize-and-post.gif' />
              <CardHeader>
                <div className='grid gap-2'>
                  <CardTitle>3. Finalize and Post:</CardTitle>
                  <CardDescription className='my-1'>
                    Review and edit the content to your preference. You can also
                    provide input for SwiftStyle AI to further refine the
                    content before posting.
                  </CardDescription>
                  <Link
                    href='#'
                    className='text-lg text-gray-800 dark:text-neutral-200 inline-flex items-center'
                  >
                    Learn more <MoveRight className='ml-2 h-4 w-4' />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </CarouselItemOrigin>
          <CarouselItemOrigin>
            <Card className='overflow-hidden w-full object-cover rounded-xl mt-8'>
              <CardImage src='/images/create-customize-characters.png' />
              <CardHeader>
                <div className='grid gap-2'>
                  <CardTitle>4. Create and Customize Characters:</CardTitle>
                  <CardDescription className='my-1'>
                    Develop characters with the writing style you desire. Share
                    these customized styles with others.
                  </CardDescription>
                  <Link
                    href='#'
                    className='text-lg text-gray-800 dark:text-neutral-200 inline-flex items-center'
                  >
                    Learn more <MoveRight className='ml-2 h-4 w-4' />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </CarouselItemOrigin>
        </CarouselContentOrigin>
      </div>

      <div>
        <div className='mb-4'>
          <h3 className='text-xs font-medium uppercase text-black'>
            <strong>Steps</strong>
          </h3>
        </div>

        {steps.map((step, index) => (
          <Step
            key={index}
            index={index + 1}
            title={step.title}
            description={step.description}
            onClick={() => handleScrollTo(index)}
          />
        ))}

        <Button asChild className='rounded-full'>
          <Link href={env.NEXT_PUBLIC_CHROME_EXTENSIONS} target='_blank'>
            <ArrowUpRight className='flex-shrink-0 size-4' /> Get started
          </Link>
        </Button>
      </div>
    </>
  );
}

const Step = ({
  index,
  title,
  description,
  onClick,
}: {
  index: number;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <div className='flex gap-x-5 ms-1 cursor-pointer' onClick={onClick}>
    <div className='relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800'>
      <div className='flex justify-center items-center'>
        <Button
          asChild
          className='rounded-full size-8 flex flex-shrink-0 justify-center items-center gap-x-2 text-xs uppercase font-medium border border-neutral-800'
        >
          <Link href={`/#${index}`}>{index}</Link>
        </Button>
      </div>
    </div>

    <div className='grow pt-0.5 pb-8 sm:pb-12'>
      <p className='text-sm lg:text-base'>
        <strong>{title}: </strong>
        {description}
      </p>
    </div>
  </div>
);

const steps = [
  {
    title: 'Download the Chrome Extension',
    description:
      'Click the "Get Started" button to download the extension from the Chrome Web Store.',
  },
  {
    title: 'Generate Content',
    description: 'Click the SwiftStyle AI button to generate content.',
  },
  {
    title: 'Finalize and Post',
    description: 'Review and edit the content to your preference.',
  },
  {
    title: 'Create and Customize Characters',
    description: 'Develop characters with the writing style you desire.',
  },
];
