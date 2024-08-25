import { serialize as serializemdx } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';

export default async function serialize(md: string) {
  // MDX text - can be from a local file, database, anywhere
  const options = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug, // add IDs to any h1-h6 tag that doesn't have one, using a slug made from its text
      ],
    },
  };

  return await serializemdx(md, options);
}
