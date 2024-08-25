import React from 'react';

import { cn } from '@/lib/utils';

export interface NavigationPanelMainProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const NavigationPanelMain = React.forwardRef<
  React.ElementRef<'div'>,
  NavigationPanelMainProps
>(function NavigationPanelMain({ children, className, ...props }, ref) {
  // is-running break-background
  return (
    <div
      ref={ref}
      className={cn(
        'mio-navigation-drawer inset-0 flex flex-col antialiased',
        'pl-[72px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export default NavigationPanelMain;
