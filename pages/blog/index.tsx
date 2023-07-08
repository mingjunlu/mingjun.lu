import { faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticPropsResult } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import styled, { css } from 'styled-components';
import Logo from '../../components/Logo';
import { mediaQueries as queries } from '../../constants';
import { isEmpty } from '../../lib/array';
import {
  PostWithoutContent,
  formatDate,
  getPosts,
  sortByPublicationTime,
} from '../../lib/post';

const inter = Inter({ subsets: ['latin'] });

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navbar>
          <LogoLink href="/">
            <Logo />
          </LogoLink>
          <Nav>
            <NavList>
              <NavListItem>
                <NavLink href="/about">About</NavLink>
              </NavListItem>
              <NavListItem isActive>
                <NavLink href="/blog">Blog</NavLink>
              </NavListItem>
            </NavList>
          </Nav>
        </Navbar>
        <Main>
          {posts.map((post) => {
            const {
              id,
              title,
              publishedAt,
              slug,
              tags,
              summary,
              featuredImage,
            } = post;
            const firstTag = tags.at(0);
            return (
              <Fragment key={id}>
                <Article>
                  <ArticleTitle>
                    <NavLink href={`/blog/${slug}`}>{title}</NavLink>
                  </ArticleTitle>
                  {!!featuredImage && (
                    <ImageWrapper>
                      <Image
                        fill
                        src={featuredImage}
                        alt="Article thumbnail"
                      />
                    </ImageWrapper>
                  )}
                  <ArticleMetadata>
                    <MetadataSegment>
                      <FontAwesomeIcon icon={faCalendar} />
                      <time dateTime={publishedAt}>
                        {formatDate(publishedAt)}
                      </time>
                    </MetadataSegment>
                    {!isEmpty(tags) && !!firstTag && (
                      <MetadataSegment>
                        <FontAwesomeIcon icon={faTag} />
                        <span>{firstTag}</span>
                      </MetadataSegment>
                    )}
                  </ArticleMetadata>
                  {!!summary && <Summary>{summary}</Summary>}
                  <NavLink href={`/blog/${slug}`}>閱讀全文</NavLink>
                </Article>
              </Fragment>
            );
          })}
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
const Navbar = styled.header`
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link).attrs({ className: inter.className })`
  display: inline-block;
  text-decoration: none;
  text-underline-offset: 6px;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
const LogoLink = styled(NavLink)`
  flex: 0 0 auto;
  padding: 6px 10px;

  @media ${queries.tabletAndWider} {
    padding: 2px 10px;
  }

  > ${Logo.Container} {
    width: 26px;
    height: 60px;
    color: var(--color-dark-gray);

    @media ${queries.tabletAndWider} {
      width: 29px;
      height: 70px;
    }
  }
`;
const Nav = styled.nav`
  flex: 1 1 150px;
  margin-left: 28px;
  overflow-x: auto;

  @media ${queries.tabletAndWider} {
    margin-left: 54px;
  }
`;
const NavList = styled.ul`
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const NavListItem = styled.li<{ isActive?: boolean }>`
  > ${NavLink} {
    display: block;
    font-size: 20px;
    padding: 6px 10px;
    color: var(--color-gray);

    ${(props) =>
      !!props.isActive &&
      css`
        font-weight: 600;
        text-decoration: underline;
        color: var(--color-dark-gray);
      `};
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
const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--color-french-gray);
  text-align: center;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  @media (min-resolution: 2dppx) {
    border-width: 0.5px;
  }
  @media ${queries.tabletAndWider} {
    position: relative;
    gap: 10px;
    min-height: 128px;
    padding-bottom: 36px;

    &:has(figure) {
      padding-right: 154px;
    }
  }

  > ${NavLink} {
    align-self: center;
    display: inline-block;
    padding: 4px 16px;
    margin-top: 4px;
    border: 1px solid var(--color-dark-gray);
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    color: var(--color-dark-gray);

    @media ${queries.tabletAndWider} {
      display: none;
    }
  }
`;
const ArticleTitle = styled.h2`
  line-height: 1.4;
  font-weight: 600;
  text-align: left;

  @media ${queries.tabletAndWider} {
    margin-top: 4px;
  }
`;
const ImageWrapper = styled.figure`
  position: relative;
  aspect-ratio: 16 / 9;

  @media ${queries.tabletAndWider} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 128px;
    height: 128px;
    aspect-ratio: 1 / 1;
  }

  > img {
    object-fit: cover;
    border-radius: 6px;
    background-color: var(--color-light-gray);
  }
`;
const ArticleMetadata = styled.aside`
  display: flex;
  gap: 12px;
  font-size: 14px;
  line-height: calc(16 / 14);
  color: var(--color-gray);

  @media ${queries.tabletAndWider} {
    order: -1;
    gap: 16px;
    font-size: 16px;
    line-height: 1;
  }
`;
const MetadataSegment = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
  border-right: 1px solid var(--color-french-gray);

  &:last-child {
    padding-right: 0;
    border-right: none;
  }

  @media (min-resolution: 2dppx) {
    border-width: 0.5px;
  }
  @media ${queries.tabletAndWider} {
    padding-right: 16px;
  }

  > .fa-calendar {
    width: 13px;
    height: 13px;

    @media ${queries.tabletAndWider} {
      transform: translateY(-1px);
    }
  }
  > .fa-tag {
    width: 14px;
    height: 14px;
    transform: translateY(0.5px);

    @media ${queries.tabletAndWider} {
      transform: none;
    }
  }
`;
const Summary = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: left;
`;
