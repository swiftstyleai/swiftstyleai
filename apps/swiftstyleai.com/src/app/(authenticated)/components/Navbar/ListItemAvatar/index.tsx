import React, { type ForwardedRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface ListItemAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItemAvatar = forwardRef<HTMLDivElement, ListItemAvatarProps>(
  function ListItemAvatar(
    { children, className, ...others }: ListItemAvatarProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'box-border relative w-12 h-12 cursor-pointer',
          className
        )}
        {...others}
      >
        {children}
      </div>
    );
  }
);

export default React.memo(ListItemAvatar);
