import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { Header, Metadata } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import { site } from 'src/constants';
import { Post, getPostBySlug, getPosts } from 'src/utils/post';
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
  } = props;

  return (
    <>
      <Metadata
        title={title}
        description={summary}
        image={featuredImage}
        url={`${site.url}/blog/${slug}`}
      />
      <Container>
        <Header />
        <Main>
          <PostMetadata publishedAt={publishedAt} tags={tags} />
          {!!featuredImage && (
            <ImageWrapper>
              <Image fill priority src={featuredImage} alt="" />
            </ImageWrapper>
          )}
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            components={markdownComponents}
          >
            {content.trim()}
          </ReactMarkdown>
        </Main>
      </Container>
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
const Main = styled.article`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 42px 0;

  @media ${queries.tabletAndWider} {
    gap: 24px;
    font-size: 18px;
    line-height: 1.8;
    width: 100%;
    padding: 54px 0;
    margin: 0 auto;

    > aside {
      order: 0;
    }
  }

  // prettier-ignore
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.4;
    font-weight: 600;
  }
  pre {
    width: 100%;
  }
`;
const ImageWrapper = styled.figure`
  position: relative;
  aspect-ratio: 16 / 9;

  > img {
    object-fit: cover;
    border-radius: 6px;
    background-color: var(--color-light-gray);
  }
`;
