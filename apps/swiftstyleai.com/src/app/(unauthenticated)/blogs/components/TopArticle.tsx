import { Link } from '@/lib/react-transition-progress/next';

import { Typography } from '@/components/ui/typography';

// Blog Card Component
export default function BlogCard({
  href,
  title,
  description,
  imageUrl,
}: {
  href: string;
  title: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <Link href={href} className='w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2'>
      <div className='relative flex flex-col min-w-0 break-words w-full'>
        <div
          className='m-0 bg-cover relative block min-h-0'
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: '50%',
            paddingTop: '56.25%',
          }}
        />
        <blockquote className='relative my-4'>
          <Typography variant='h4' className='font-bold'>
            {title}
          </Typography>
          <Typography className='my-2'>{description}</Typography>
        </blockquote>
      </div>
    </Link>
  );
}
