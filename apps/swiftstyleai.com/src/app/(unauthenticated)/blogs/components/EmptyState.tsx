import { Typography } from '@/components/ui/typography';

export default function EmptyState() {
  return (
    <div className='w-full text-center justify-center items-center flex-col min-h-[200px] flex p-5'>
      <svg
        className='w-48 mb-4 mx-auto'
        width='178'
        height='90'
        viewBox='0 0 178 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='27'
          y='50.5'
          width='124'
          height='39'
          rx='7.5'
          fill='currentColor'
          className='fill-white dark:fill-neutral-800'
        ></rect>
        <rect
          x='27'
          y='50.5'
          width='124'
          height='39'
          rx='7.5'
          stroke='currentColor'
          className='stroke-gray-50 dark:stroke-neutral-700/10'
        ></rect>
        <rect
          x='34.5'
          y='58'
          width='24'
          height='24'
          rx='4'
          fill='currentColor'
          className='fill-gray-50 dark:fill-neutral-700/30'
        ></rect>
        <rect
          x='66.5'
          y='61'
          width='60'
          height='6'
          rx='3'
          fill='currentColor'
          className='fill-gray-50 dark:fill-neutral-700/30'
        ></rect>
        <rect
          x='66.5'
          y='73'
          width='77'
          height='6'
          rx='3'
          fill='currentColor'
          className='fill-gray-50 dark:fill-neutral-700/30'
        ></rect>
        <rect
          x='19.5'
          y='28.5'
          width='139'
          height='39'
          rx='7.5'
          fill='currentColor'
          className='fill-white dark:fill-neutral-800'
        ></rect>
        <rect
          x='19.5'
          y='28.5'
          width='139'
          height='39'
          rx='7.5'
          stroke='currentColor'
          className='stroke-gray-100 dark:stroke-neutral-700/30'
        ></rect>
        <rect
          x='27'
          y='36'
          width='24'
          height='24'
          rx='4'
          fill='currentColor'
          className='fill-gray-100 dark:fill-neutral-700/70'
        ></rect>
        <rect
          x='59'
          y='39'
          width='60'
          height='6'
          rx='3'
          fill='currentColor'
          className='fill-gray-100 dark:fill-neutral-700/70'
        ></rect>
        <rect
          x='59'
          y='51'
          width='92'
          height='6'
          rx='3'
          fill='currentColor'
          className='fill-gray-100 dark:fill-neutral-700/70'
        ></rect>
        <g filter='url(#filter1)'>
          <rect
            x='12'
            y='6'
            width='154'
            height='40'
            rx='8'
            fill='currentColor'
            className='fill-white dark:fill-neutral-800'
            shape-rendering='crispEdges'
          ></rect>
          <rect
            x='12.5'
            y='6.5'
            width='153'
            height='39'
            rx='7.5'
            stroke='currentColor'
            className='stroke-gray-100 dark:stroke-neutral-700/60'
            shape-rendering='crispEdges'
          ></rect>
          <rect
            x='20'
            y='14'
            width='24'
            height='24'
            rx='4'
            fill='currentColor'
            className='fill-gray-200 dark:fill-neutral-700 '
          ></rect>
          <rect
            x='52'
            y='17'
            width='60'
            height='6'
            rx='3'
            fill='currentColor'
            className='fill-gray-200 dark:fill-neutral-700'
          ></rect>
          <rect
            x='52'
            y='29'
            width='106'
            height='6'
            rx='3'
            fill='currentColor'
            className='fill-gray-200 dark:fill-neutral-700'
          ></rect>
        </g>
        <defs>
          <filter
            id='filter1'
            x='0'
            y='0'
            width='178'
            height='64'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix'></feFlood>
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            ></feColorMatrix>
            <feOffset dy='6'></feOffset>
            <feGaussianBlur stdDeviation='6'></feGaussianBlur>
            <feComposite in2='hardAlpha' operator='out'></feComposite>
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0'
            ></feColorMatrix>
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_1187_14810'
            ></feBlend>
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_1187_14810'
              result='shape'
            ></feBlend>
          </filter>
        </defs>
      </svg>

      <div className='max-w-sm mx-auto'>
        <Typography
          className='mt-2 font-medium dark:text-neutral-200'
          variant='h4'
        >
          No Blog Posts Available
        </Typography>
        <Typography className='mt-3 mb-5 leading-5 dark:text-neutral-500'>
          It looks like there are no blog posts yet. We’ll keep you informed as
          soon as new content is published!
        </Typography>
      </div>
    </div>
  );
}
