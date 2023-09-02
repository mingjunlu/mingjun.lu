'use client';

import { Metadata } from 'next';
import { useEffect } from 'react';
import SomethingWentWrongSvg from 'public/error-500.svg';
import { ErrorScreen, VisuallyHiddenHeading } from 'src/components';
import { site } from 'src/constants';
import styles from './error.module.scss';

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError(props: RootErrorProps) {
  const { error } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
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

export function generateMetadata(): Metadata {
  return {
    title: `Something Went Wrong | ${site.name}`,
  };
}
