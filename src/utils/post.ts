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
  try {
    const viewCount = await redis.hincrby(`post:${slug}`, 'views', 1);
    await redis.hset('cache:post-view-counter', {
      [slug]: viewCount,
    });
    return viewCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export function getSlug(text: string | undefined | null): string {
  return (
    text
      ?.split('/')
      .filter((segment) => !!segment.trim())
      .at(-1) ?? ''
  );
}
