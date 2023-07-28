import { GetStaticPropsResult } from 'next';
import styled from 'styled-components';
import { Header, Metadata } from 'src/components';
import { site } from 'src/constants';
import { mediaQueries as queries } from 'src/constants';
import {
  PostWithoutContent,
  getPosts,
  isLcp,
  sortByPublicationTime,
} from 'src/utils/post';
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
      <Container>
        <Header />
        <Main>
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
        </Main>
      </Container>
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

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 18px 20px;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
  @media ${queries.tabletAndWider} {
    padding: 60px;
    max-width: 754px;
    margin: 0 auto;
  }
`;
const Main = styled.section`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 42px 0;

  @media ${queries.tabletAndWider} {
    padding: 54px 0;
    margin: 0 auto;
  }
`;
const VisuallyHiddenHeading = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
