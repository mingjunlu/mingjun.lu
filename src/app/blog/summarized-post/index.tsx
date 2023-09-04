import Image from 'next/image';
import PostMetadata from 'src/app/blog/post-metadata';
import { NavLink } from 'src/components';
import { PostWithoutContent } from 'src/utils/post';
import styles from './summarized-post.module.scss';

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
    <article className={styles.container}>
      <h2 className={styles.title}>
        <NavLink href={`/blog/${slug}`}>{title}</NavLink>
      </h2>
      {!!featuredImage && (
        <figure className={styles.imageWrapper}>
          <Image
            fill
            priority={shouldPreloadImage}
            src={featuredImage}
            alt="Article thumbnail"
          />
        </figure>
      )}
      <PostMetadata
        publishedAt={publishedAt}
        tags={tags}
        readingTime={readingTime}
      />
      {!!summary && <p className={styles.summary}>{summary}</p>}
      <NavLink
        href={`/blog/${slug}`}
        aria-label={`閱讀全文：${title}`}
      >
        閱讀全文
      </NavLink>
    </article>
  );
}
