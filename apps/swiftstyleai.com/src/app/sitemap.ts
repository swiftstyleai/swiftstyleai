// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// https://github.com/leerob/leerob.io/blob/main/app/sitemap.ts
import { deploymentURL } from '@/constant/env';
import {
  filterLangBlogPosts,
  getBlogPosts,
  sortBlogPosts,
} from '@/db/mdx/blogs';

export default async function sitemap() {
  const allBlogs = await getBlogPosts();
  const sortedBlogs = sortBlogPosts(allBlogs);
  const enBlogs = filterLangBlogPosts(sortedBlogs, 'en');

  const blogs = enBlogs.map((post) => ({
    url: `${deploymentURL}/blogs/${post.metadata.permalink}`,
    lastModified: new Date(
      post.metadata.publishedAt || post.metadata.updatedDate
    )
      .toISOString()
      .split('T')[0],
  }));

  const routes = [
    '',
    '/changelog',
    '/contact',
    '/cookie-policy',
    '/privacy-policy',
    '/blogs',
    '/signin',
  ].map((route) => ({
    url: `${deploymentURL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
