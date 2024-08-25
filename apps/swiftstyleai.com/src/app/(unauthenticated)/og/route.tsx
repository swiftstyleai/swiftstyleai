// https://github.com/johneatmon/eatmon.co/blob/81a749c8766ba2ac34c84a1fef8ebdc24855b979/app/og/route.tsx#L4
// https://cruip.com/generate-dynamic-open-graph-and-twitter-images-in-next-js/
// https://github.com/theodorusclarence/og/blob/main/src/pages/api/general.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

import { deploymentURL } from '@/constant/env';

export const runtime = 'edge';

const uncutSansBoldFont = fetch(
  new URL('~/fonts/Uncut-Sans-Bold.woff', import.meta.url)
).then((res) => res.arrayBuffer());

const background = () => {
  if (process.env.NODE_ENV === 'production') {
    return `url(${deploymentURL}/images/social-card-bg.jpg)`;
  } else {
    return 'linear-gradient(to right, #000, #111)';
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = decodeURIComponent(searchParams.get('title') as string);

  const fontData = await uncutSansBoldFont;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundSize: '100% 100%',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'Inter',
          padding: '40px 80px',
          backgroundImage: background(),
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            color: 'white',
            marginBottom: 24,
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>
        <img
          width={132 * 2}
          height={44 * 2}
          src={`${deploymentURL}/images/founder-swiftstyle-ai.png`}
        />
      </div>
    ),
    {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: 'Uncut Sans',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
