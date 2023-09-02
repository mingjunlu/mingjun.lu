import { Metadata } from 'next';
import PageNotFoundSvg from 'public/error-404.svg';
import { ErrorScreen, VisuallyHiddenHeading } from 'src/components';
import { site } from 'src/constants';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <>
      <ErrorScreen>
        <figure className={styles.imageWrapper}>
          <PageNotFoundSvg />
          <figcaption>
            <VisuallyHiddenHeading>
              Page Not Found
            </VisuallyHiddenHeading>
          </figcaption>
        </figure>
      </ErrorScreen>
    </>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Page Not Found | ${site.name}`,
  };
}
