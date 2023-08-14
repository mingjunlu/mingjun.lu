import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import { getNoteContentById, getNotes, isBlogNote } from './note';

export type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  summary?: string;
  featuredImage?: string;
  readingTime: number;
};
export type PostWithoutContent = Omit<Post, 'content'>;
type FrontMatter = Partial<
  Pick<
    Post,
    | 'title'
    | 'publishedAt'
    | 'slug'
    | 'tags'
    | 'summary'
    | 'featuredImage'
  >
>;

export async function getPosts(): Promise<PostWithoutContent[]> {
  const notes = await getNotes();
  const notesWithContent = await Promise.all(
    notes.filter(isBlogNote).map((note) => {
      return getNoteContentById(note.id).then((content) => ({
        ...note,
        content,
      }));
    })
  );
  const matter = (await import('gray-matter')).default;
  return notesWithContent.map((note) => {
    const matterFile = matter(note.content);
    const frontMatter: FrontMatter = matterFile.data;
    if (!frontMatter.title) {
      throw new Error('Invalid title');
    }
    if (!frontMatter.publishedAt) {
      throw new Error('Invalid publication time');
    }
    if (!frontMatter.slug) {
      throw new Error('Invalid slug');
    }
    return {
      id: note.id,
      title: frontMatter.title,
      publishedAt: frontMatter.publishedAt,
      slug: frontMatter.slug,
      tags: frontMatter.tags || [],
      summary: frontMatter.summary || '',
      featuredImage: frontMatter.featuredImage || '',
      readingTime: getReadingTime(note.content),
    };
  });
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const posts = await getPosts();
  const foundPost = posts.find((post) => post.slug === slug);
  if (!foundPost) {
    throw new Error(`Post not found (slug: ${slug})`);
  }
  const noteContent = await getNoteContentById(foundPost.id);
  const matter = (await import('gray-matter')).default;
  const matterFile = matter(noteContent);
  const frontMatter: FrontMatter = matterFile.data;
  if (!frontMatter.title) {
    throw new Error('Invalid title');
  }
  if (!frontMatter.publishedAt) {
    throw new Error('Invalid publication time');
  }
  if (!frontMatter.slug) {
    throw new Error('Invalid slug');
  }
  return {
    id: foundPost.id,
    title: frontMatter.title,
    content: matterFile.content,
    publishedAt: frontMatter.publishedAt,
    slug: frontMatter.slug,
    tags: frontMatter.tags || [],
    summary: frontMatter.summary || '',
    featuredImage: frontMatter.featuredImage || '',
    readingTime: getReadingTime(noteContent),
  };
}

export function sortByPublicationTime<
  Type extends { publishedAt: string }
>(a: Type, b: Type): number {
  const timestampA = new Date(a.publishedAt).getTime();
  const timestampB = new Date(b.publishedAt).getTime();
  return timestampB - timestampA;
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
}

export function getReadingTime(text: string): number {
  const stats = readingTime(toString(fromMarkdown(text)), {
    wordsPerMinute: 250,
  });
  return stats.minutes;
}

export function isLcp(
  index: number,
  indexOfFirstImage: number
): boolean {
  // No need to preload if there are no images
  if (indexOfFirstImage < 0) {
    return false;
  }
  // Preload the first two ones if any of them has an image
  if (indexOfFirstImage < 2) {
    return index < 2;
  }
  // Preload first three ones at most
  return index < 3;
}
