import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import { redis } from 'src/instances/redis';

export function sortByPublicationTime<
  Type extends { data: { publishedAt: string } },
>(a: Type, b: Type): number {
  const timestampA = new Date(a.data.publishedAt).getTime();
  const timestampB = new Date(b.data.publishedAt).getTime();
  return timestampB - timestampA;
}

export function getReadingTime(markdown: string): number {
  const stats = readingTime(toString(fromMarkdown(markdown)), {
    wordsPerMinute: 250,
  });
  return Math.ceil(stats.minutes);
}

export async function increasePostView(slug?: string): Promise<number> {
  if (!slug) {
    return 0;
  }
  const viewCount = await redis.hincrby(`post:${slug}`, 'views', 1);
  await redis.hset('cache:post-view-counter', {
    [slug]: viewCount,
  });
  return viewCount;
}

export async function getPostViews(slugs: string[]): Promise<number[]> {
  if (slugs.length === 0) {
    return [];
  }
  const cache = await redis.hmget<Record<string, number>>(
    'cache:post-view-counter',
    ...slugs,
  );
  if (cache) {
    return slugs.map((slug) => cache[slug] ?? 0);
  }
  const pipeline = redis.pipeline();
  slugs.forEach((slug) => {
    pipeline.hget<number>(`post:${slug}`, 'views');
  });
  const viewCounts = await pipeline.exec<(number | null)[]>();
  const counter = Object.fromEntries(
    slugs.map((slug, index) => [slug, viewCounts.at(index) ?? 0]),
  );
  await redis.hset('cache:post-view-counter', counter);
  return viewCounts.map((value) => value ?? 0);
}
