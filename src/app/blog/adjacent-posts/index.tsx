import { NavLink } from 'src/components';
import { getAdjacentPosts } from 'src/utils/post';
import styles from './adjacent-posts.module.scss';

type AdjacentPostsProps = {
  currentId: string;
};

export default async function AdjacentPosts(
  props: AdjacentPostsProps
) {
  const { currentId } = props;
  const { previous, next } = await getAdjacentPosts(currentId);

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          {!!previous && (
            <NavLink
              href={`/blog/${previous.slug}`}
              className={styles.previous}
            >
              {previous.title}
            </NavLink>
          )}
        </li>
        <li className={styles.listItem}>
          {!!next && (
            <NavLink
              href={`/blog/${next.slug}`}
              className={styles.next}
            >
              {next.title}
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
