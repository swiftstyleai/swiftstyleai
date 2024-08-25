import { deploymentURL } from '@/constant/env';

export type OpenGraphType = {
  title: string;
  description?: string;
  [key: string]: string | undefined;
};

// !STARTERCONF This OG is generated from https://github.com/theodorusclarence/og
// Please clone and self-host if your site is expected to have high traffic.
// Update the URL and default logo accordingly.
export function openGraph({
  title,
  description,
  ...rest
}: OpenGraphType): string {
  const params: Record<string, string> = {
    title: encodeURIComponent(title.trim()),
    ...rest,
  };
  if (description && description.trim()) {
    params.description = encodeURIComponent(description.trim());
  }

  // Construct URL parameters with dynamic properties
  const ogImageUrlParams = new URLSearchParams(params);

  // Create the full URL for the Open Graph image
  const ogImage = new URL(`/og?${ogImageUrlParams}`, deploymentURL).href;

  return ogImage;
}
