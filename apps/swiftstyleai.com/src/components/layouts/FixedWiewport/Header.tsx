import React from 'react';

import { cn } from '@/lib/utils';

export interface FixedWiewportHeaderProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const FixedWiewportHeader = React.forwardRef<
  React.ElementRef<'div'>,
  FixedWiewportHeaderProps
>(function FixedWiewportHeader({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'navbar bg-base-100 flex items-center min-h-[4rem] w-full px-[0.5rem)] pt-4 sm:pt-6 md:pt-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export default FixedWiewportHeader;
