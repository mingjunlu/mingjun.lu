import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'src/components';
import { site } from 'src/constants';
import { Post, getPostBySlug, getPosts } from 'src/utils/post';
import styles from './[slug].module.scss';
import Markdown from './markdown';
import PostMetadata from './post-metadata';

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

type Params = {
  slug: string;
};
type BlogPostProps = Post;

export default function BlogPost(props: BlogPostProps) {
  const {
    title,
    content,
    publishedAt,
    slug,
    tags,
    summary,
    featuredImage = '',
    readingTime,
  } = props;

  return (
    <>
      <Metadata
        title={title}
        description={summary}
        image={featuredImage}
        url={`${site.url}/blog/${slug}`}
      />
      <article className={styles.container}>
        <PostMetadata
          publishedAt={publishedAt}
          tags={tags}
          readingTime={readingTime}
        />
        {!!featuredImage && (
          <figure className={styles.imageWrapper}>
            <Image fill priority src={featuredImage} alt="" />
          </figure>
        )}
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          components={markdownComponents}
        >
          {content.trim()}
        </ReactMarkdown>
      </article>
    </>
  );
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<Params>
> {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => {
      const params: Params = {
        slug: post.slug,
      };
      return {
        params,
      };
    }),
    fallback: false,
  };
}
export async function getStaticProps(
  context: GetStaticPropsContext<Params>
): Promise<GetStaticPropsResult<BlogPostProps>> {
  if (!context.params) {
    throw new Error('Invalid context params');
  }
  const post = await getPostBySlug(context.params.slug);
  return {
    props: post,
  };
}
