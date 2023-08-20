import SomethingWentWrongSvg from 'public/error-500.svg';
import {
  ErrorScreen,
  Metadata,
  VisuallyHiddenHeading,
} from 'src/components';
import styles from './500.module.scss';

export default function Custom500() {
  return (
    <>
      <Metadata title="Something Went Wrong" />
      <ErrorScreen>
        <figure className={styles.imageWrapper}>
          <SomethingWentWrongSvg />
          <figcaption>
            <VisuallyHiddenHeading>
              Something Went Wrong
            </VisuallyHiddenHeading>
          </figcaption>
        </figure>
      </ErrorScreen>
    </>
  );
}
