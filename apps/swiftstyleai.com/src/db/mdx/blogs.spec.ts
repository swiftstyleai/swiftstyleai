import { getBlogPost } from './blogs';

describe('db/mdx', () => {
  describe('getBlogPost', () => {
    it('should return the correct blog post when a valid permalink is provided', async () => {
      const permalink = 'creative-ways-to-use-swiftstyle-ai';
      const post = await getBlogPost(permalink);
      expect(post?.metadata.title).toEqual(
        'Creative Ways to Use SwiftStyle AI'
      );
    });

    it('should return undefined when a permalink does not match any post', async () => {
      const permalink = 'non-existent-post';
      const post = await getBlogPost(permalink);
      expect(post).toBeUndefined();
    });

    // it('should return the first post when permalink is the first one', async () => {
    //   const permalink = 'first-post';
    //   const post = await getBlogPost(permalink);
    //   expect(post).toEqual(mockPosts[0]);
    // });
  });
});
