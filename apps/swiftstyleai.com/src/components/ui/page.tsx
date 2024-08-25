import * as React from 'react';

import { cn } from '@/lib/utils';

import { Typography } from './typography';

export interface HeaderPageProps extends React.ComponentProps<'div'> {
  title: string;
  description?: React.ReactNode;
}

const HeaderPage = React.forwardRef<HTMLDivElement, HeaderPageProps>(
  ({ className, title, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('events-listing__content', className)}
      {...props}
    >
      <Typography variant='h1' className='hero__title'>
        {title}
      </Typography>

      {description && <div className='clearfix mb-4 sm:mb-5' />}

      {description && <Typography>{description}</Typography>}
    </div>
  )
);

HeaderPage.displayName = 'HeaderPage';

export { HeaderPage };
