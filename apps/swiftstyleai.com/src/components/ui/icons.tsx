// https://github.com/shadcn-ui/ui/blob/main/apps/www/components/icons.tsx
import { forwardRef } from 'react';

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  medium: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <svg
      aria-hidden='true'
      width='24px'
      height='24px'
      focusable='false'
      data-prefix='fab'
      data-icon='medium-m'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      ref={ref}
      {...props}
    >
      <path
        fill='currentColor'
        d='M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z'
      ></path>
    </svg>
  )),
  telegram: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <svg
      aria-hidden='true'
      width='24px'
      height='24px'
      focusable='false'
      data-prefix='fab'
      data-icon='medium-m'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      ref={ref}
      {...props}
    >
      <path
        d='M484.689,98.231l-69.417,327.37c-5.237,23.105-18.895,28.854-38.304,17.972L271.2,365.631     l-51.034,49.086c-5.646,5.647-10.371,10.372-21.256,10.372l7.598-107.722L402.539,140.23c8.523-7.598-1.848-11.809-13.247-4.21     L146.95,288.614L42.619,255.96c-22.694-7.086-23.104-22.695,4.723-33.579L455.423,65.166     C474.316,58.081,490.85,69.375,484.689,98.231z'
        fill='currentColor'
      />
    </svg>
  )),
};
