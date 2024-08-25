'use client';

import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

import { Carousel } from '@/components/ui/carousel';
import Section from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';

import CarouselContent from './CarouselContent';

export default function HowItWorksSections() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Section id='how-it-works' className='py-10 lg:pt-20'>
      <div className='max-w-3xl mb-10 lg:mb-14'>
        <Typography variant='h2'>How it works</Typography>
        {/* <p className='mt-1'>
          This profound insight guides our comprehensive strategy — from
          meticulous research and strategic planning to the seamless execution
          of brand development and website or product deployment.
        </p> */}
      </div>

      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center'
      >
        <CarouselContent />
      </Carousel>
    </Section>
  );
}
