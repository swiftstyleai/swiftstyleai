import { useHover } from 'ahooks';
import isFunction from 'lodash/isFunction';
import React, { type ForwardedRef, forwardRef, useRef } from 'react';

import { mergeRefs } from '@/lib/merge-refs';
import { cn } from '@/lib/utils';

export interface ListItemProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  active?: boolean;
  children:
    | React.ReactNode
    | ((props: { active: boolean; hover: boolean }) => JSX.Element);
}

const ListItem = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  { active = false, children, className, ...others }: ListItemProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const isHovering = useHover(localRef);

  return (
    <div
      ref={mergeRefs([localRef, ref])}
      className={cn(
        'relative flex justify-center mt-0 mb-2 mx-0 w-[72px]',
        className
      )}
      {...others}
    >
      {isFunction(children)
        ? children({
            active,
            hover: isHovering,
          })
        : children}
    </div>
  );
});

export default React.memo(ListItem);
