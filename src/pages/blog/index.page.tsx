import { GetStaticPropsResult } from 'next';
import { Metadata, VisuallyHiddenHeading } from 'src/components';
import { site } from 'src/constants';
import {
  PostWithoutContent,
  getPosts,
  isLcp,
  sortByPublicationTime,
} from 'src/utils/post';
import styles from './index.module.scss';
import SummarizedPost from './summarized-post';

type BlogProps = {
  posts: PostWithoutContent[];
};

export default function Blog(props: BlogProps) {
  const { posts } = props;

  const indexOfFirstImage = posts.findIndex(
    (post) => !!post.featuredImage
  );

  return (
    <>
      <Metadata
        title="Blog"
        description="Ming-jun 的部落格，用淺顯易懂的方式記錄所學與應用。"
        url={`${site.url}/blog`}
      />
      <main className={styles.container}>
        <VisuallyHiddenHeading>Blog Posts</VisuallyHiddenHeading>
        {posts.map((post, index) => (
          <SummarizedPost
            key={post.id}
            id={post.id}
            title={post.title}
            publishedAt={post.publishedAt}
            slug={post.slug}
            tags={post.tags}
            summary={post.summary}
            featuredImage={post.featuredImage}
            readingTime={post.readingTime}
            shouldPreloadImage={isLcp(index, indexOfFirstImage)}
          />
        ))}
      </main>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const posts = await getPosts();
  const sortedPosts = [...posts].sort(sortByPublicationTime);
  return {
    props: {
      posts: sortedPosts,
    },
  };
}
