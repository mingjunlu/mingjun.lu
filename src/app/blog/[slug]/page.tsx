import { Metadata } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { site } from 'src/constants';
import { getPostBySlug, getPosts } from 'src/utils/post';
import Markdown from '../markdown';
import PostMetadata from '../post-metadata';
import styles from './post.module.scss';

const remarkPlugins: PluggableList = [
  [remarkGfm, { singleTilde: false }],
];
const markdownComponents = {
  a: Markdown.Link,
  blockquote: Markdown.Quote,
  code: Markdown.Code,
  h1: Markdown.HeadingLevelOne,
  hr: Markdown.HorizontalLine,
  img: Markdown.Image,
  table: Markdown.Table,
};

type BlogPostProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPost(props: BlogPostProps) {
  const { params } = props;
  const post = await getPostBySlug(params.slug);

  return (
    <>
      <article className={styles.container}>
        <PostMetadata
          publishedAt={post.publishedAt}
          tags={post.tags}
          readingTime={post.readingTime}
        />
        {!!post.featuredImage && (
          <figure className={styles.imageWrapper}>
            <Image fill priority src={post.featuredImage} alt="" />
          </figure>
        )}
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          components={markdownComponents}
        >
          {post.content.trim()}
        </ReactMarkdown>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
export async function generateMetadata(
  props: BlogPostProps
): Promise<Metadata> {
  const { params } = props;
  const post = await getPostBySlug(params.slug);
  const title = `${post.title} | ${site.name}`;
  return {
    title,
    description: post.summary,
    openGraph: {
      url: `/blog/${post.slug}`,
      title,
      description: post.summary,
      images: post.featuredImage
        ? [{ url: post.featuredImage }]
        : undefined,
    },
  };
}
