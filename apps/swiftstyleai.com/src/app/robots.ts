// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// https://github.com/leerob/leerob.io/blob/main/app/robots.ts
import { deploymentURL } from '@/constant/env';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${deploymentURL}/sitemap.xml`,
    host: deploymentURL,
  };
}
