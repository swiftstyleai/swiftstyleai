'use client';

import { useState } from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import ColorLogo from '@/components/logo/ColorLogo';
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';

import { siteConfig } from '@/constant/config';
import { useUser } from '@/contexts/auth/AuthProvider';

export interface RouteProps {
  href: string;
  label: string;
}

const ROUTE_LIST: RouteProps[] = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/blogs', label: 'Blogs' },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className='sticky top-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav
        className='relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto'
        aria-label='Global'
      >
        <div className='md:col-span-3'>
          <Link
            className='flex items-center flex-none rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80'
            href='/'
            aria-label={siteConfig.title}
          >
            <ColorLogo
              width={52}
              height={52}
              animation='breath'
              className='hidden lg:inline'
            />
            <p className='lg:border-s lg:ps-4 lg:ms-3'>{siteConfig.title}</p>
          </Link>
        </div>

        <div className='flex items-center gap-x-2 ms-auto py-1 md:order-3 md:col-span-3'>
          {!user ? (
            <Button asChild>
              <Link href='/signin'>Sign in</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
          )}

          <div className='md:hidden'>
            <button
              type='button'
              className='hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700'
              onClick={toggleNav}
              aria-label='Toggle navigation'
            >
              <svg
                className={`hs-collapse-open ${
                  navOpen ? 'hidden' : 'block'
                } flex-shrink-0 size-4`}
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
                <line x1='3' x2='21' y1='6' y2='6' />
                <line x1='3' x2='21' y1='12' y2='12' />
                <line x1='3' x2='21' y1='18' y2='18' />
              </svg>
              <svg
                className={`hs-collapse-open ${
                  navOpen ? 'block' : 'hidden'
                } flex-shrink-0 size-4`}
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
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </div>
          <ModeToggle />
        </div>

        <div
          id='navbar-collapse-with-animation'
          className={`hs-collapse ${
            navOpen ? '' : 'hidden'
          } overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6`}
        >
          <div className='flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0'>
            {ROUTE_LIST.map(({ href, label }, index) => (
              <Link
                rel='noreferrer noopener'
                key={`${href}-${index}`}
                href={href}
                className='inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300'
              >
                {label}
              </Link>
            ))}
            {/* <div>
              <a
                className='relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white'
                href='#how-it-works'
                aria-current='page'
              >
                How it work
              </a>
            </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
