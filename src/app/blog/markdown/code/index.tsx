import { Code as SyntaxHighlighter } from 'bright';
import clsx from 'clsx';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import styles from './code.module.scss';

const highlighterStyle = {
  fontSize: undefined,
  padding: undefined,
  margin: undefined,
  borderRadius: undefined,
  overflow: undefined,
  color: undefined,
  colorScheme: undefined,
};

export default function Code(props: CodeProps) {
  const { children, inline, className } = props;

  const matches = /language-(\w+)/.exec(className ?? '');
  const shouldHighlightSyntax = !!matches;

  if (inline) {
    return (
      <code
        className={clsx(styles.base, styles.inlineCode, className)}
      >
        {children}
      </code>
    );
  }
  if (!shouldHighlightSyntax) {
    return (
      <code
        className={clsx(styles.base, styles.codeBlock, className)}
      >
        {children}
      </code>
    );
  }
  return (
    <SyntaxHighlighter
      lang={matches.at(1)}
      className={clsx(styles.highlighter, className)}
      style={highlighterStyle}
      codeClassName={clsx(styles.base, styles.highlightedCodeBlock)}
    >
      {children.toString().trim()}
    </SyntaxHighlighter>
  );
}
