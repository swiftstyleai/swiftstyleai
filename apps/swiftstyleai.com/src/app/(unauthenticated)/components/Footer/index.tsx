import { Github, Twitter } from 'lucide-react';

import ColorLogo from '@/components/logo/ColorLogo';
import { Icons } from '@/components/ui/icons';
import Section from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';

import { siteConfig } from '@/constant/config';
import env from '@/constant/server';

import FooterColumn, { type RouteProps } from './FooterColumn';
import IconLink from './IconLink';

const ROUTE_LIST: RouteProps[] = [
  { href: '/changelog', label: 'Changelog' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
];

const RESOURCES_LIST: RouteProps[] = [
  { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'About Us', disabled: true },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
];

const SUPPORTS_LIST: RouteProps[] = [
  // { href: '#', label: 'Discord Community', disabled: true },
  {
    href: `${env.NEXT_PUBLIC_GITHUB_LINK}/issues/new?assignees=&labels=enhancement&template=feature_request.yml`,
    label: 'Feature Request',
    target: '_blank',
  },
  {
    href: `${env.NEXT_PUBLIC_GITHUB_LINK}/issues/new?assignees=&labels=bug&template=bug_report.yml`,
    label: 'Report a Bug',
    target: '_blank',
  },
  // { href: '#', label: 'hello@swiftstyleai.com', disabled: true },
];

export default function Footer() {
  return (
    <footer className='z-10 overflow-hidden dark:bg-gradient-to-t dark:from-blue-900/10 dark:to-transparent'>
      <Section className='py-10 lg:pt-20'>
        <div className='pb-10'>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
            {/* Logo and Site Title */}
            <div className='col-span-full lg:col-span-1'>
              <div className='inline-flex items-center'>
                <ColorLogo width={40} height={40} animation='breath' />
                <Typography variant='h4' className='ms-5 font-semibold' asChild>
                  <h3>{siteConfig.title}</h3>
                </Typography>
              </div>
            </div>

            {/* Product Links */}
            <FooterColumn title='Product' links={ROUTE_LIST} />

            {/* Legal Links */}
            {/* <FooterColumn title='Legal' links={LEGAL_LIST} /> */}

            {/* Resources Links */}
            <FooterColumn title='Resources' links={RESOURCES_LIST} />

            {/* Support Links */}
            <FooterColumn title='Support' links={SUPPORTS_LIST} />
          </div>

          <div className='grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center'>
            <p className='text-xs sm:text-sm text-gray-600 dark:text-neutral-500'>
              © 2024 {siteConfig.title} LLC.
            </p>
            {/* <ul>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-neutral-600">
                <a
                  className='inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/privacy-policy'
                >
                  Privacy Policy
                </a>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-neutral-600">
                <a
                  className='inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/cookie-policy'
                >
                  Cookie Policy
                </a>
              </li>
            </ul> */}
            <div className='flex space-x-2'>
              {env.NEXT_PUBLIC_X_LINK && (
                <IconLink href={env.NEXT_PUBLIC_X_LINK} icon={Twitter} />
              )}
              {env.NEXT_PUBLIC_GITHUB_LINK && (
                <IconLink href={env.NEXT_PUBLIC_GITHUB_LINK} icon={Github} />
              )}
              {env.NEXT_PUBLIC_MEDIUM_LINK && (
                <IconLink
                  href={env.NEXT_PUBLIC_MEDIUM_LINK}
                  icon={Icons.medium}
                />
              )}
              {env.NEXT_PUBLIC_TELEGRAM_LINK && (
                <IconLink
                  href={env.NEXT_PUBLIC_TELEGRAM_LINK}
                  icon={Icons.telegram}
                />
              )}
            </div>
          </div>
        </div>

        <div className='bg-[radial-gradient(closest-side,#205331,#a3e635,transparent)] h-1'></div>
      </Section>
    </footer>
  );
}
