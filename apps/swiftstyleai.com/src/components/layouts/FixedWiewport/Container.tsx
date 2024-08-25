import React from 'react';

import { cn } from '@/lib/utils';

export interface FixedWiewportContainerProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const FixedWiewportContainer = React.forwardRef<
  React.ElementRef<'div'>,
  FixedWiewportContainerProps
>(function FixedWiewportContainer({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'mio-navigation-drawer w-full inset-0 flex flex-col antialiased is-running break-background',
        className
      )}
      {...props}
    >
      <div className='pageContent page-content page-content-height w-full'>
        {children}
      </div>
    </div>
  );
});

export default FixedWiewportContainer;
