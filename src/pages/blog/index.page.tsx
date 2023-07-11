import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Header } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import {
  PostWithoutContent,
  getPosts,
  sortByPublicationTime,
} from 'src/utils/post';
import SummarizedPost from './summarized-post';

type BlogProps = {
  posts: PostWithoutContent[];
};

export default function Blog(props: BlogProps) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Blog | Ming-jun Lu</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Container>
        <Header />
        <Main>
          {posts.map((post) => (
            <SummarizedPost
              key={post.id}
              id={post.id}
              title={post.title}
              publishedAt={post.publishedAt}
              slug={post.slug}
              tags={post.tags}
              summary={post.summary}
              featuredImage={post.featuredImage}
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
