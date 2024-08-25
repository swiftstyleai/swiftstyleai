import { FrontMatterResult } from '@/lib/mdx/front-matter';
import { openGraph } from '@/lib/og';

import { type Metadata as BlogMetadata } from '@/db/mdx/types';

export function getCover(post: FrontMatterResult<BlogMetadata>) {
  const { title, cover } = post.metadata;
  if (cover) {
    return cover.src;
  }
  return openGraph({ title });
}
