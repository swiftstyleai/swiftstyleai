import React from 'react';

const LogoIcon: React.FC<{ animationStyle: string }> = ({ animationStyle }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 100 100"
    width="34"
    height="34"
  >
    <g className="ldl-scale">
      <g className="ldl-ani">
        <g
          className="ldl-layer"
          style={{
            transformOrigin: '50px 50px',
            transform:
              'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
            animation: `1s linear -0.625s infinite normal forwards running ${animationStyle}`,
          }}
          transform="translate(-.454 6.25)"
        >
          <circle
            cx="50"
            cy="50.621"
            r="30.896"
            fill="none"
            stroke="#e0e0e0"
            strokeMiterlimit="10"
            strokeWidth="3"
            className="ldl-ani"
          />
        </g>
        <g
          className="ldl-layer"
          id="circle-green"
          style={{
            transformOrigin: '50px 50px',
            transform:
              'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
            animation: `1s linear -0.75s infinite normal forwards running ${animationStyle}`,
          }}
          transform="translate(-.454 6.25)"
        >
          <circle
            cx="50"
            cy="19.725"
            r="15"
            fill="#abbd81"
            stroke="#e0e0e0"
            strokeMiterlimit="10"
            strokeWidth="3"
            className="ldl-ani"
          />
        </g>
        <g
          className="ldl-layer"
          id="circle-orange"
          style={{
            transformOrigin: '50px 50px',
            transform:
              'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
            animation: `1s linear -0.875s infinite normal forwards running ${animationStyle}`,
          }}
          transform="translate(-.454 6.25)"
        >
          <circle
            cx="23.243"
            cy="66.069"
            r="14.997"
            fill="#f8b26a"
            stroke="#e0e0e0"
            strokeMiterlimit="10"
            strokeWidth="3"
            className="ldl-ani"
          />
        </g>
        <g
          className="ldl-layer"
          id="circle-red"
          style={{
            transformOrigin: '50px 50px',
            transform:
              'matrix3d(0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 0.91, 0, 0, 0, 0, 1)',
            animation: `1s linear -1s infinite normal forwards running ${animationStyle}`,
          }}
          transform="translate(-.454 6.25)"
        >
          <circle
            cx="77.761"
            cy="66.069"
            r="14.997"
            fill="#e15b64"
            stroke="#e0e0e0"
            strokeMiterlimit="10"
            strokeWidth="3"
            className="ldl-ani"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default LogoIcon;
