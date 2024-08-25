import React from 'react';

import { dateFormat } from '@/lib/format/date';

export type ChangelogProps = {
  date: Date | string;
  children: React.ReactNode;
};

function Changelog({ date, children }: ChangelogProps) {
  // Format the date to "MMMM d, yyyy" (e.g., "July 4, 2024")
  const formattedDate = dateFormat(date, 'MMMM d, yyyy');
  const id = dateFormat(date, 'yyyy-MM-dd');

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className='md:flex'>
      <h2
        id={`${id}-heading`}
        className='pl-7 text-sm leading-6 text-slate-500 md:w-1/4 md:pl-0 md:pr-12 md:text-right dark:text-slate-400'
      >
        <a href={`#${id}`}>{formattedDate}</a>
      </h2>
      <div className='relative pl-7 pt-2 md:w-3/4 md:pl-12 md:pt-0 pb-16'>
        <div className='absolute bottom-0 left-0 w-px bg-slate-200 -top-3 md:top-2.5'></div>
        <div className='absolute -left-1 -top-[1.0625rem] h-[0.5625rem] w-[0.5625rem] rounded-full border-2 border-slate-300 bg-white md:top-[0.4375rem]'></div>

        {children}
      </div>
    </section>
  );
}

export default Changelog;
