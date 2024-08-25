'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

const variants = {
  open: { borderRadius: '30%' },
  closed: { borderRadius: '50%' },
};

export interface AvatarAnimationProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  active?: boolean;
  hover?: boolean;
}

const AvatarAnimation = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarAnimationProps
>(({ className, active = false, hover = false, children, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    asChild
    className={cn(
      'relative flex h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[50%] transition-colors bg-background',
      {
        'text-primary-foreground bg-primary hover:bg-primary/90':
          active || hover,
      },
      className
    )}
    {...props}
  >
    <motion.span
      animate={active || hover ? 'open' : 'closed'}
      variants={variants}
    >
      {children}
    </motion.span>
  </AvatarPrimitive.Root>
));
AvatarAnimation.displayName = AvatarPrimitive.Root.displayName;

export { AvatarAnimation };
