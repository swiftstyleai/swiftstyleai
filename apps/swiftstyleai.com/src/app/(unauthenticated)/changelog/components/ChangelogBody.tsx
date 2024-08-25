import React from 'react';

export type ChangelogBodyProps = {
  children: React.ReactNode;
};

function ChangelogBody({ children }: ChangelogBodyProps) {
  return (
    <div className='max-w-none prose prose-slate prose-h3:mb-4 prose-h3:text-base prose-h3:leading-6 prose-sm prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:prose-invert dark:prose-h3:text-base dark:prose-a:text-sky-400 dark:hover:prose-a:text-sky-500'>
      {children}
    </div>
  );
}

export default ChangelogBody;
