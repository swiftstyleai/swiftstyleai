import React from 'react';

export interface DarkcolorLogoProps {
  width: number;
  height: number;
  animation?: 'breath' | 'spin';
  className?: string;
}

const DarkcolorLogo: React.FC<DarkcolorLogoProps> = ({
  width,
  height,
  animation,
  className,
}) => {
  let animate = null;

  if (animation === 'breath') {
    animate = 'breath_animate';
  }

  if (animation === 'spin') {
    animate = 'spin_animate';
  }

  return (
    <svg
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      className={className}
    >
      <g
        className='ldl-scale'
        style={{
          transform: 'rotate(0deg) scale(1, 1)',
        }}
        transform='matrix(1.188465, 0, 0, 1.144808, -9.966167, -0.074025)'
      >
        <g className='ldl-ani'>
          <g
            className='ldl-layer'
            style={{
              transformOrigin: '50px 50px',
              transform:
                'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
              animation: animate
                ? `1s linear -0.625s infinite normal forwards running ${animate}`
                : undefined,
            }}
            transform='translate(-.454 6.25)'
          >
            <circle
              cx='50'
              cy='50.621'
              r='30.896'
              fill='none'
              // stroke='#e0e0e0'
              stroke='#000'
              strokeMiterlimit='10'
              strokeWidth='3'
              className='ldl-ani'
            ></circle>
          </g>
          <g
            className='ldl-layer'
            id='circle-green'
            style={{
              transformOrigin: '50px 50px',
              transform:
                'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
              animation: animate
                ? `1s linear -0.75s infinite normal forwards running ${animate}`
                : undefined,
            }}
            transform='translate(-.454 6.25)'
          >
            <circle
              cx='50'
              cy='19.725'
              r='15'
              fill='#abbd81'
              // stroke='#e0e0e0'
              stroke='#000'
              strokeMiterlimit='10'
              strokeWidth='3'
              className='ldl-ani'
            ></circle>
          </g>
          <g
            className='ldl-layer'
            id='circle-orange'
            style={{
              transformOrigin: '50px 50px',
              transform:
                'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
              animation: animate
                ? `1s linear -0.875s infinite normal forwards running ${animate}`
                : undefined,
            }}
            transform='translate(-.454 6.25)'
          >
            <circle
              cx='23.243'
              cy='66.069'
              r='14.997'
              fill='#f8b26a'
              // stroke='#e0e0e0'
              stroke='#000'
              strokeMiterlimit='10'
              strokeWidth='3'
              className='ldl-ani'
            ></circle>
          </g>
          <g
            className='ldl-layer'
            id='circle-red'
            style={{
              transformOrigin: '50px 50px',
              transform:
                'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
              animation: animate
                ? `1s linear -1s infinite normal forwards running ${animate}`
                : undefined,
            }}
            transform='translate(-.454 6.25)'
          >
            <circle
              cx='77.761'
              cy='66.069'
              r='14.997'
              fill='#e15b64'
              // stroke='#e0e0e0'
              stroke='#000'
              strokeMiterlimit='10'
              strokeWidth='3'
              className='ldl-ani'
            ></circle>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default DarkcolorLogo;
