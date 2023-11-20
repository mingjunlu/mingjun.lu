import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema(context) {
    return z.object({
      title: z.string(),
      publishedAt: z.string().datetime(),
      tags: z.array(z.string()),
      summary: z.string(),
      image: z
        .object({
          src: context.image(),
          alt: z.string().default(''),
          credit: z.string().optional(),
        })
        .optional(),
    });
  },
});

export const collections = {
  posts: postCollection,
};
