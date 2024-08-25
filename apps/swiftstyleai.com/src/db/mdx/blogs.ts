import fs from 'fs';
import path from 'path';

import readAllFilesInFolder from '@/lib/files/read-all-files-in-folder';
import parseFrontmatter, {
  type FrontMatterResult,
} from '@/lib/mdx/front-matter';

import { type Metadata } from './types';

const root = path.join(process.cwd(), 'contents', 'blogs');

// Function to get all blog posts.
export async function getBlogPosts() {
  // step 1: get all files
  const files = await readAllFilesInFolder('**/*.mdx', root);

  // step 2: parse mdx
  const result: FrontMatterResult<Metadata>[] = [];
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    if (!file) continue;
    const rawcontent = fs.readFileSync(path.join(root, file), 'utf-8');
    const content: FrontMatterResult<Metadata> =
      parseFrontmatter<Metadata>(rawcontent);
    result.push(content);
  }

  return result;
}

// Function to get blog post.
export async function getBlogPost(
  permalink: string
): Promise<FrontMatterResult<Metadata> | undefined> {
  const posts = await getBlogPosts();
  return posts.find(
    (post: FrontMatterResult<Metadata>) => post.metadata.permalink === permalink
  );
}

export async function getRelatedBlogPost(
  posts: FrontMatterResult<Metadata>[],
  permalink: string
): Promise<FrontMatterResult<Metadata>[]> {
  const startIndex = posts.findIndex(
    (post) => post.metadata.permalink === permalink
  );

  // Return the next three posts after the found permalink
  return startIndex !== -1 ? posts.slice(startIndex + 1, startIndex + 4) : [];
}

// Function to sorted all blog posts.
export function sortBlogPosts(
  posts: FrontMatterResult<Metadata>[]
): FrontMatterResult<Metadata>[] {
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedDate).getTime() -
      new Date(a.metadata.publishedDate).getTime()
  );
}

export function filterLangBlogPosts(
  posts: FrontMatterResult<Metadata>[],
  lang: string
): FrontMatterResult<Metadata>[] {
  return posts.filter((a) => a.metadata.lang === lang);
}
