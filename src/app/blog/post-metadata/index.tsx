import {
  faCalendar,
  faClock,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post, formatDate } from 'src/utils/post';
import styles from './post-metadata.module.scss';

type PostMetadataProps = Pick<
  Post,
  'publishedAt' | 'tags' | 'readingTime'
>;

export default function PostMetadata(props: PostMetadataProps) {
  const { publishedAt, readingTime, tags } = props;

  const publicationDate = formatDate(publishedAt);
  const firstTag = tags.at(0);

  return (
    <aside className={styles.container}>
      <div className={styles.segment}>
        <FontAwesomeIcon icon={faCalendar} />
        <time dateTime={publishedAt}>{publicationDate}</time>
      </div>
      <div className={styles.segment}>
        <FontAwesomeIcon icon={faClock} />
        <span>{`${readingTime} min`}</span>
      </div>
      {!!firstTag && (
        <div className={styles.segment}>
          <FontAwesomeIcon icon={faTag} />
          <span>{firstTag}</span>
        </div>
      )}
    </aside>
  );
}
