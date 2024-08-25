import { type Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

import { HeaderPage } from '@/components/ui/page';
import Section from '@/components/ui/section';

import { siteConfig } from '@/constant/config';
import { deploymentURL } from '@/constant/env';
import env from '@/constant/server';

import Changelog from './components/Changelog';
import ChangelogBody from './components/ChangelogBody';
import Footer from '../components/Footer';
import Header from '../components/Header';

const title = `Changelog | ${siteConfig.title}`;
const description = `Stay up to date with all of the latest additions and improvements we&#x27;ve made to ${siteConfig.title}.`;

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

const ChangelogPage = () => {
  return (
    <>
      <Header />
      <Section className='flex flex-col items-start justify-start'>
        <HeaderPage
          title='Changelog'
          description={
            <>
              Stay up to date with all of the latest additions and improvements
              we've made to {siteConfig.title}.
            </>
          }
          className='pt-24 pb-12 mx-auto text-center'
        />

        <div className='relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]'>
          <div className='relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
            <Changelog date='2024-08-17'>
              <ChangelogBody>
                {/* <h3>Swiftstyle AI v0.2.0</h3>
                <p>
                  The React examples in Tailwind UI are now easier to use with
                  React Server Components (RSC).
                </p>
                <Image
                  className='rounded-xl'
                  src='/images/blogs/swiftstyle-ai-release-cover-0.2.0.png'
                  alt='Swiftstyle AI Release v0.2.0'
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <p>
                  Server components don't support passing functions as props, so
                  anywhere we did that in Tailwind UI you'd need to make the
                  parent a client component, even when that component had no
                  actual interactivity.
                </p>
                <p>
                  Using the new <code>data-*</code> state attributes in Headless
                  UI v2.0, we were able to remove all of the render props that
                  we were using to conditionally apply different classes based
                  on the state of the component.
                </p>
                <p>
                  We've also updated any components that <em>do</em> need to be
                  client components to include <code>'use client'</code> at the
                  top of the example, so you can copy and paste them into your
                  RSC project and they'll work right away.
                </p> */}
                <h3 id='swiftstyle-ai-0-2-0-expanding-horizons'>
                  SwiftStyle AI 0.2.0: Expanding Horizons
                </h3>
                <Image
                  className='rounded-xl'
                  src='/images/blogs/swiftstyle-ai-release-cover-0.2.0.png'
                  alt='Swiftstyle AI Release v0.2.0'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                />
                <p>
                  🌟 <strong>Features</strong>
                </p>
                <ol>
                  <li>
                    <strong>
                      <a href='https://www.langchain.com/' target='_blank'>
                        LangChain Integration
                      </a>
                      :
                    </strong>{' '}
                    Initially built using{' '}
                    <a href='https://developers.google.com/' target='_blank'>
                      Google’s SDK
                    </a>{' '}
                    for the{' '}
                    <a
                      href='https://ai.google.com/research/competitions/'
                      target='_blank'
                    >
                      Google AI competition
                    </a>
                    , SwiftStyle AI now supports LangChain. This integration
                    allows us to expand the project and incorporate multiple
                    models, enhancing the tool&#39;s flexibility and power.
                  </li>
                  <li>
                    <strong>Homepage Update:</strong> We&#39;ve revamped our
                    homepage and added a new blog feature to keep you updated on
                    all the latest developments.
                  </li>
                </ol>
                <p>
                  📅 <strong>Public Roadmap</strong>
                </p>
                <ul>
                  <li>
                    <strong>Build in Public:</strong> SwiftStyle AI is being
                    developed with community feedback at its core. We&#39;re
                    committed to building a product that truly meets users&#39;
                    needs. Check out our{' '}
                    <a
                      href='https://github.com/swiftstyleai/swiftstyleai/issues'
                      target='_blank'
                    >
                      public roadmap
                    </a>{' '}
                    to see what&#39;s coming next and contribute your ideas!
                  </li>
                </ul>
              </ChangelogBody>
            </Changelog>
            <Changelog date='2024-08-10'>
              <ChangelogBody>
                <h3 id='swiftstyle-ai-0-1-0-stepping-into-the-future-with-ai'>
                  SwiftStyle AI 0.1.0: Stepping into the Future with AI
                </h3>
                <Image
                  className='rounded-xl'
                  src='/images/blogs/swiftstyle-ai-release-cover-0.1.0.png'
                  alt='Swiftstyle AI Release v0.1.0'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                />
                <p>
                  🌟 <strong>Features</strong>
                </p>
                <ol>
                  <li>
                    <strong>Generate Replies on Tweets:</strong> Users can now
                    effortlessly create replies directly on tweets.
                  </li>
                  <li>
                    <strong>Create Tweets:</strong> Crafting original tweets is
                    now possible with SwiftStyle AI, making social media
                    engagement easier than ever.
                  </li>
                </ol>
                <p>
                  🎉 <strong>Milestones</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      <a
                        href='https://ai.google.com/research/competitions/'
                        target='_blank'
                      >
                        Google AI Competition
                      </a>
                      :
                    </strong>{' '}
                    SwiftStyle AI is now part of the prestigious Google AI
                    Competition! Developers are challenged to create
                    groundbreaking apps with the Gemini API to showcase the
                    power of generative AI.
                  </li>
                </ul>
                <p>
                  🚀 <strong>Launch</strong>
                </p>
                <ul>
                  <li>
                    <strong>Chrome Extension Published:</strong> SwiftStyle AI
                    is officially available on the{' '}
                    <a
                      href='https://chromewebstore.google.com/detail/swiftstyle-ai/gdhmpapkbpmhahhpmgjblilnjkjalgfh?authuser=0&amp;hl=en'
                      target='_blank'
                    >
                      Chrome Web Store
                    </a>
                    .
                  </li>
                </ul>
              </ChangelogBody>
            </Changelog>
            {/* <Changelog date='2024-05-24'>
              <ChangelogBody>
                <h3>
                  Catalyst: Application layouts, navigation menus, description
                  lists, and more
                </h3>
                <p>
                  We just published the first major update to{' '}
                  <a href='/templates/catalyst'>Catalyst</a> since releasing the
                  development preview, with two new application layouts, navbar
                  and sidebar components, description lists, and more.
                </p>
                <a href='/templates/catalyst'>
                  <img
                    className='rounded-xl'
                    src='https://tailwindui.com/img/changelog/catalyst-application-layouts.png'
                    alt='Catalyst sidebar layout'
                  />
                </a>
                <p>
                  Here's a complete list of all the new components, available in
                  both JavaScript and TypeScript:
                </p>
                <ul>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/sidebar-layout'>
                      Sidebar layout
                    </a>
                  </li>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/stacked-layout'>
                      Stacked layout
                    </a>
                  </li>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/navbar'>
                      Navbar
                    </a>
                  </li>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/sidebar'>
                      Sidebar
                    </a>
                  </li>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/description-list'>
                      Description list
                    </a>
                  </li>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/heading'>
                      Heading
                    </a>
                  </li>
                  <li>
                    <a href='https://catalyst.tailwindui.com/docs/divider'>
                      Divider
                    </a>
                  </li>
                </ul>
                <p>
                  We’re also pumped to share that with the release of{' '}
                  <a href='https://tailwindcss.com/blog/headless-ui-v2'>
                    Headless UI v2.0 for React
                  </a>
                  , Catalyst is no longer in development preview — it’s
                  officially stable and you can start using it in production
                  today without worrying about breaking changes in the
                  underlying dependencies.
                </p>
                <p>
                  Check out our brand new{' '}
                  <a href='https://catalyst-demo.tailwindui.com'>
                    live demo site
                  </a>{' '}
                  to see what a full Catalyst project looks and feels like after
                  these updates for yourself.
                </p>
              </ChangelogBody>
            </Changelog> */}

            {/* <Changelog date='2024-05-23'>
              <ChangelogBody>
                <h3>Headless UI v2.0 for React</h3>
                <p>
                  We've just updated all the React components in Tailwind UI as
                  well as our Next.js templates to use{' '}
                  <a href='https://headlessui.com/'>Headless UI v2.0</a>, the
                  latest major version of this library that we released just a
                  couple weeks ago.
                </p>
                <img
                  className='rounded-xl'
                  src='https://tailwindui.com/img/changelog/headless-ui-v2.jpg'
                  alt='Headless UI v2.0'
                />
                <p>
                  Headless UI v2.0 is jammed-packed with new features, including
                  built-in anchor positioning, a new checkbox component,
                  combobox list virtualization, and much more. See our{' '}
                  <a href='https://tailwindcss.com/blog/headless-ui-v2'>
                    announcement post
                  </a>{' '}
                  for all the details.
                </p>
                <p>
                  We recommend upgrading existing Headless UI v1.x projects to
                  this latest version, and have put together a detailed{' '}
                  <a href='https://github.com/tailwindlabs/headlessui/releases/tag/%40headlessui%2Freact%40v2.0.0#user-content-upgrading-from-v1'>
                    upgrade guide
                  </a>{' '}
                  explaining what's all changed.
                </p>
              </ChangelogBody>
            </Changelog> */}

            {/* <Changelog date='2023-12-20'>
              <ChangelogBody>
                <h3>
                  Introducing Catalyst: A modern application UI kit for React
                </h3>
                <p>
                  We just released the first development preview of{' '}
                  <a href='/templates/catalyst'>Catalyst</a>, our first
                  fully-componentized, batteries-included application UI kit for
                  React — real components with thoughtfully designed APIs that
                  build on each other to create a real component architecture,
                  the same way we’d do it in a real application.
                </p>
                <p>
                  There’s a lot more to come, but we’re releasing it today so
                  you can play with it right away as we continue to build new
                  components and find ways to make it an even better experience.
                </p>
                <a href='/templates/catalyst'>
                  <img
                    className='rounded-xl'
                    src='https://tailwindui.com/img/templates/catalyst/preview.png'
                    alt='The new Catalyst UI kit'
                  />
                </a>
              </ChangelogBody>
            </Changelog> */}

            {/* <Changelog date='2023-09-07'>
              <ChangelogBody>
                <h3>Next.js site templates now available in TypeScript</h3>
                <p>
                  All of our Next.js site <a href='/templates'>templates</a> are
                  now available in both JavaScript and TypeScript, so you can
                  choose whichever language is the better fit for you and your
                  team.
                </p>
                <a href='/templates'>
                  <img
                    className='rounded-xl'
                    src='https://tailwindui.com/img/changelog/20230907-typescript-templates.png'
                    alt='Tailwind UI templates now available in TypeScript'
                  />
                </a>
                <p>
                  When you download a template, you'll find two folders in the
                  zip file — and , each containing the source code for the
                  entire template in the corresponding language.
                </p>
                <p>
                  Each template has been authored with the latest version of
                  TypeScript by nerds who get way too much satisfaction out of
                  getting the types just right, so if TypeScript is your thing,
                  you should find the experience very satisfying.
                </p>
              </ChangelogBody>
            </Changelog> */}
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default ChangelogPage;
