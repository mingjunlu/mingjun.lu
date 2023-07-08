import matter from 'gray-matter';
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
    };
  });
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
