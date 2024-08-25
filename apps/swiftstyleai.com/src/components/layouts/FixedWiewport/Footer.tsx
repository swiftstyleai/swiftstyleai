import React from 'react';

import { cn } from '@/lib/utils';

export interface FixedWiewportFooterProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const FixedWiewportFooter = React.forwardRef<
  React.ElementRef<'div'>,
  FixedWiewportFooterProps
>(function FixedWiewportFooter({ children, className, ...props }, ref) {
  return (
    <footer ref={ref} className={cn('relative', className)} {...props}>
      <div className='relative bg-black/30 sm:bg-transparent sm:w-fit flex sm:gap-x-2 sm:pb-5'>
        {children}
      </div>
    </footer>
  );
});

export default FixedWiewportFooter;
