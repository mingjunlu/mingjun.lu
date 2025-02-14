import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { increasePostView } from 'src/utils/post';

export const prerender = false;

const postEntries = await getCollection('posts');
const slugSet = new Set<string>(postEntries.map((entry) => entry.slug));

export async function POST(context: APIContext) {
  const { slug = '' } = context.params;
  if (!slugSet.has(slug)) {
    return new Response(null, { status: 404 });
  }
  await increasePostView(slug);
  return new Response(null, { status: 200 });
}
