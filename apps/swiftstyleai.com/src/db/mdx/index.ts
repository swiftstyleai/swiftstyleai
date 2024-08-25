import fs from 'fs';
import path from 'path';

import readAllFilesInFolder from '@/lib/files/read-all-files-in-folder';
import parseFrontmatter, {
  type FrontMatterResult,
} from '@/lib/mdx/front-matter';
import serialize from '@/lib/mdx/serialize';

import { type Metadata } from './types';

const root = path.join(process.cwd(), 'contents');

// Function to get all posts.
export async function getPosts(folder: string) {
  // Step 1: Get all MDX files in the specified folder.
  const files = await readAllFilesInFolder('**/*.mdx', path.join(root, folder));

  // Step 2: Parse each MDX file to extract front matter metadata.
  return files.map((file) => {
    const rawContent = fs.readFileSync(path.join(root, file), 'utf-8');
    return parseFrontmatter<Metadata>(rawContent);
  });
}

// Type definition for the getPost function options.
export type GetPostOptions = {
  folder?: string;
  filter?: {
    tag?: string;
  };
};

// Function to get a specific post by permalink and optional tag filtering.
export async function getPost(
  permalink: string,
  options: GetPostOptions = {}
): Promise<FrontMatterResult<Metadata> | undefined> {
  const { folder = '', filter } = options;

  // Step 1: Retrieve all posts from the specified folder.
  const posts = await getPosts(folder);

  // Step 2: Filter posts by permalink.
  const post = posts.find((post) => post.metadata.permalink === permalink);

  // Step 3: If a tag filter is provided, check if the post's tags include the given tag.
  if (post && filter?.tag) {
    const hasTag = post.metadata.tags?.some((tag) => tag.slug === filter.tag);
    if (!hasTag) return undefined;
  }

  // Step 4: Return the post if found and meets the filter criteria.
  return post;
}

export async function getLocalizedContent(
  locale: string,
  defaultPermalink: string,
  localeMap: Record<string, string>
) {
  const permalink = localeMap[locale] || defaultPermalink;
  const post = await getPost(permalink);
  return post && post.body ? serialize(post.body) : null;
}
