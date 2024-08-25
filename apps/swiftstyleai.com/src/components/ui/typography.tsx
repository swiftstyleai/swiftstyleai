// https://github.com/shadcn-ui/ui/issues/315#issuecomment-1882739488
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

const typographyVariants = cva('text-gray-800 dark:text-neutral-200', {
  variants: {
    variant: {
      h1: 'font-extrabold text-4xl md:text-5xl lg:text-6xl',
      h2: 'font-bold text-3xl lg:text-4xl',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl',
      // p: 'leading-7 [&:not(:first-child)]:mt-6',
      p: '',
    },
    affects: {
      default: '',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      removePMargin: '[&:not(:first-child)]:mt-0',
    },
  },
  defaultVariants: {
    variant: 'p',
    affects: 'default',
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    { variant, affects, asChild = false, className, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'p';

    return (
      <Comp
        className={cn(typographyVariants({ variant, affects }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
