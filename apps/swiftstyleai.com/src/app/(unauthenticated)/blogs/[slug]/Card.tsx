import React from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import {
  Card as CardOrigin,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Card = () => {
  return (
    <Link href='/150m-series-d'>
      <div className='ease overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800'>
        <img
          alt='Announcing our $150M Series D'
          loading='lazy'
          width='500'
          height='400'
          decoding='async'
          data-nimg='1'
          className='h-64 w-full object-cover duration-700 ease-in-out scale-100 blur-0'
          srcSet='https://demo.vercel.pub/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fvercel-platforms%2Fimage%2Fupload%2Fv1642127409%2Ftcfvbui9mowuo9q853uz.png&amp;w=640&amp;q=75 1x, https://demo.vercel.pub/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fvercel-platforms%2Fimage%2Fupload%2Fv1642127409%2Ftcfvbui9mowuo9q853uz.png&amp;w=1080&amp;q=75 2x'
          src='https://demo.vercel.pub/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fvercel-platforms%2Fimage%2Fupload%2Fv1642127409%2Ftcfvbui9mowuo9q853uz.png&amp;w=1080&amp;q=75'
          style={{
            color: 'transparent',
          }}
        />
        <div className='h-36 border-t border-stone-200 px-5 py-8 dark:border-stone-700 dark:bg-black'>
          <h3 className='font-title text-xl tracking-wide dark:text-white'>
            Announcing our $150M Series D
          </h3>
          <p className='text-md my-2 truncate italic text-stone-600 dark:text-stone-400'>
            We re excited to announce $150 million in Series D funding at a
            valuation of over $2.5 billion, with the goal of building the
            end-to-end platform for the modern Web.
          </p>
          <p className='my-2 text-sm text-stone-600 dark:text-stone-400'>
            Published Jan 14, 2022
          </p>
        </div>
      </div>

      <CardOrigin>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </CardOrigin>
    </Link>
  );
};

export default Card;
