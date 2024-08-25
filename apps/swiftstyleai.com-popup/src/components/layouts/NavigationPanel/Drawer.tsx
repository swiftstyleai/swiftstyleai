import React from 'react';

import { cn } from '@/lib/utils';

export interface NavigationPanelDrawerProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const NavigationPanelDrawer = React.forwardRef<
  React.ElementRef<'div'>,
  NavigationPanelDrawerProps
>(function NavigationPanelDrawer({ children, className, ...props }, ref) {
  return (
    <aside
      ref={ref}
      className={cn(
        'fixed inset-y-0 left-0 z-10 flex flex-col justify-center h-full w-[72px] grid',
        'bg-black bg-opacity-30 backdrop-blur-lg',
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
});

export default NavigationPanelDrawer;
