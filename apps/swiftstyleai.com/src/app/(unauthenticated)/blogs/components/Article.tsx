import React from 'react';

import { dateFormat } from '@/lib/format/date';
import { Link } from '@/lib/react-transition-progress/next';

import { Typography } from '@/components/ui/typography';

export interface ArticleProps {
  title: string;
  description: string;
  publishedDate: string;
  permalink: string;
}

const Article = ({
  title,
  description,
  publishedDate,
  permalink,
}: ArticleProps) => {
  return (
    <div className='mb-6 w-full'>
      <Link href={`/blogs/${permalink}/`}>
        <div className='flex md:flex-row flex-col-reverse justify-between mb-2'>
          <Typography variant='h4' className='font-bold'>
            {title}
          </Typography>
          <time
            className='typography-body1 text-gray-500 text-left md:text-right w-32'
            dateTime='23-01-20'
          >
            {dateFormat(publishedDate)}
          </time>
        </div>
        <Typography className='typography-body2 text-gray-600 dark:text-gray-400'>
          {description}
        </Typography>
      </Link>
    </div>
  );
};

export default Article;
