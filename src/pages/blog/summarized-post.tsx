import Image from 'next/image';
import styled from 'styled-components';
import { NavLink } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import { PostWithoutContent } from 'src/utils/post';
import PostMetadata from './post-metadata';

type SummarizedPostProps = PostWithoutContent & {
  shouldPreloadImage?: boolean;
};

export default function SummarizedPost(props: SummarizedPostProps) {
  const {
    title,
    publishedAt,
    slug,
    tags,
    summary = '',
    featuredImage = '',
    readingTime,
    shouldPreloadImage = false,
  } = props;

  return (
    <Container>
      <Title>
        <NavLink href={`/blog/${slug}`}>{title}</NavLink>
      </Title>
      {!!featuredImage && (
        <ImageWrapper>
          <Image
            fill
            priority={shouldPreloadImage}
            src={featuredImage}
            alt="Article thumbnail"
          />
        </ImageWrapper>
      )}
      <PostMetadata
        publishedAt={publishedAt}
        tags={tags}
        readingTime={readingTime}
      />
      {!!summary && <Summary>{summary}</Summary>}
      <NavLink href={`/blog/${slug}`}>閱讀全文</NavLink>
    </Container>
  );
}

const Container = styled.article`
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
const Title = styled.h2`
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
const Summary = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: left;
`;
