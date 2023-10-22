import { Metadata } from 'next';
import { VisuallyHiddenHeading } from 'src/components';
import { site } from 'src/constants';
import { getPosts, isLcp } from 'src/utils/post';
import styles from './blog.module.scss';
import SummarizedPost from './summarized-post';

export default async function Blog() {
  const posts = await getPosts();
  const indexOfFirstImage = posts.findIndex(
    (post) => !!post.featuredImage,
  );

  return (
    <>
      <main className={styles.container}>
        <VisuallyHiddenHeading>文章列表</VisuallyHiddenHeading>
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

export function generateMetadata(): Metadata {
  const title = `Blog | ${site.name}`;
  const description =
    'Ming-jun 的部落格，用淺顯易懂的方式記錄所學與應用。';
  return {
    title,
    description,
    openGraph: {
      url: '/blog',
      title,
      description,
      images: [{ url: '/opengraph-image.png' }],
    },
  };
}
