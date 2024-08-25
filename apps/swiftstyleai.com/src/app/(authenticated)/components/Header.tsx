import React from 'react';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/constant/config';

export type HeaderProps = {
  title?: React.ReactNode;
};

const Header = ({
  title = <h1 className='text-xl font-semibold'>{siteConfig.title}</h1>,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 flex h-14 items-center gap-4 bg-background px-4',
        'sm:static sm:h-auto sm:bg-transparent sm:px-6',
        'z-30'
      )}
      style={
        {
          // background: 'red',
        }
      }
    >
      {title}
    </header>
  );
};

export default Header;
