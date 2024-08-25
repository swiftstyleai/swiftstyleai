import Script from 'next/script';
import * as React from 'react';

function MSClarity() {
  if (!process.env.NEXT_PUBLIC_MS_CLARITY_CODE) {
    return null;
  }

  return (
    <Script
      id='ms-clarity'
      async
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MS_CLARITY_CODE}");`,
      }}
    />
  );
}

if (process.env.NODE_ENV !== 'production') {
  MSClarity.displayName = 'lib_ms_clarity__MSClarity';
}

export default MSClarity;
