'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const linearProgressVariants = cva(
  'absolute origin-left w-auto left-0 inset-y-0',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'bg-background',
        secondary: 'bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type LinearProgressProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof linearProgressVariants>;

const LinearProgress = forwardRef<HTMLSpanElement, LinearProgressProps>(
  function LinearProgress({ variant, className, ...others }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          'LinearProgress-root LinearProgress-indeterminate relative overflow-hidden w-full block h-1 z-0',
          className
        )}
        role='progressbar'
        style={{
          backgroundColor: ' hsl(var(--primary) / 30%)',
        }}
        {...others}
      >
        <span
          className={cn(
            linearProgressVariants({
              variant,
              className:
                'LinearProgress-bar LinearProgress-bar1Indeterminate animate-indeterminate-bar1',
            })
          )}
        ></span>
        <span
          className={cn(
            linearProgressVariants({
              variant,
              className:
                'LinearProgress-bar LinearProgress-bar2Indeterminate animate-indeterminate-bar2',
            })
          )}
        ></span>
      </span>
    );
  }
);

export default React.memo(LinearProgress);
