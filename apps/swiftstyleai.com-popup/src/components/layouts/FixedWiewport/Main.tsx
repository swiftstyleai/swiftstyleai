import React from 'react';

import { cn } from '@/lib/utils';

export interface FixedWiewportMainProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const FixedWiewportMain = React.forwardRef<
  React.ElementRef<'div'>,
  FixedWiewportMainProps
>(function FixedWiewportMain({ children, className, ...props }, ref) {
  return (
    <main
      ref={ref}
      className={cn('relative flex flex-col flex-1', className)}
      {...props}
    >
      {children}
    </main>
  );
});

export default FixedWiewportMain;
