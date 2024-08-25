import React from 'react';

import { cn } from '@/lib/utils';

export type SectionProps = React.ComponentPropsWithoutRef<'section'>;

const Section = ({ children, className, ...rest }: SectionProps) => {
  return (
    <section
      className={cn('w-full max-w-5xl px-4 xl:px-0 mx-auto', className)}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;
