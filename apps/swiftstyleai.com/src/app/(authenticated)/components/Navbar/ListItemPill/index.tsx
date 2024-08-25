import { motion } from 'framer-motion';
import React, { type ForwardedRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const pillSpanVariants = {
  open: { height: 40 },
  hover: { height: 20 },
  closed: { height: 8 },
};

export interface ListItemPillProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  hover?: boolean;
}

const ListItemPill = forwardRef<HTMLDivElement, ListItemPillProps>(
  function ListItemPill(
    { active, hover, className, ...others }: ListItemPillProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute left-0 top-0 overflow-hidden w-2 h-12 flex items-center justify-start',
          className
        )}
        aria-hidden='true'
        style={{ contain: 'layout size' }}
        {...others}
      >
        <motion.span
          animate={active ? 'open' : hover ? 'hover' : 'closed'}
          className={cn(
            'block w-2 -ml-1 rounded-[0_4px_4px_0] opacity-100 h-2 transition-colors bg-background',
            {
              'text-primary-foreground bg-primary hover:bg-primary/90':
                active || hover,
            }
          )}
          variants={pillSpanVariants}
        />
      </div>
    );
  }
);

export default React.memo(ListItemPill);
