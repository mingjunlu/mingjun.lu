import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './visually-hidden-heading.module.scss';

type VisuallyHiddenHeadingProps = ComponentProps<'h1'>;

export default function VisuallyHiddenHeading(
  props: VisuallyHiddenHeadingProps
) {
  const { children, className, ...rest } = props;

  return (
    <h1 {...rest} className={clsx(styles.container, className)}>
      {children}
    </h1>
  );
}
