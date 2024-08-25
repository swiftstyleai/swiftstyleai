'use client';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { startTransition } from 'react';

import { formatUrl } from './format-url';
import { useProgress } from './index';

// Copied from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute('target');
  return (
    (target && target !== '_self') ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function Link({
  href,
  children,
  replace,
  scroll,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const startProgress = useProgress();

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        if (isModifiedEvent(e)) return;
        e.preventDefault();

        startTransition(() => {
          startProgress();
          const url = typeof href === 'string' ? href : formatUrl(href as any);
          if (replace) {
            router.replace(url, { scroll });
          } else {
            router.push(url, { scroll });
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}

export function usePushHook() {
  const router = useRouter();
  const startProgress = useProgress();

  const pushWithProgress = (
    href: any,
    { replace = false, scroll = true } = {}
  ) => {
    startTransition(() => {
      startProgress();
      const url = typeof href === 'string' ? href : formatUrl(href);
      if (replace) {
        router.replace(url, { scroll });
      } else {
        router.push(url, { scroll });
      }
    });
  };

  return { pushWithProgress };
}
