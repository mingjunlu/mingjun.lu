import { faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { mediaQueries as queries } from 'src/constants';
import { Post, formatDate } from 'src/utils/post';

type PostMetadataProps = Pick<Post, 'publishedAt' | 'tags'>;

export default function PostMetadata(props: PostMetadataProps) {
  const { publishedAt, tags } = props;

  const publicationDate = formatDate(publishedAt);
  const firstTag = tags.at(0);

  return (
    <Container>
      <Segment>
        <FontAwesomeIcon icon={faCalendar} />
        <time dateTime={publishedAt}>{publicationDate}</time>
      </Segment>
      {!!firstTag && (
        <Segment>
          <FontAwesomeIcon icon={faTag} />
          <span>{firstTag}</span>
        </Segment>
      )}
    </Container>
  );
}

const Container = styled.aside`
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
const Segment = styled.div`
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
