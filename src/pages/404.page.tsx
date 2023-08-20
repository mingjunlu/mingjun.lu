import PageNotFoundSvg from 'public/error-404.svg';
import {
  ErrorScreen,
  Metadata,
  VisuallyHiddenHeading,
} from 'src/components';
import styles from './404.module.scss';

export default function Custom404() {
  return (
    <>
      <Metadata title="Page Not Found" />
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
