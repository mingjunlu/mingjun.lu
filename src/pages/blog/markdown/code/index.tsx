import clsx from 'clsx';
import { ComponentProps } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import sass from 'react-syntax-highlighter/dist/cjs/languages/prism/sass';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './code.module.scss';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('sass', sass);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);

const highlighterStyle = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    direction: undefined,
    lineHeight: undefined,
    fontSize: undefined,
    textAlign: undefined,
    textShadow: undefined,
  },
  'pre[class*="language-"]': {},
};
const highlighterCustomStyle = {
  backgroundColor: undefined,
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
      language={matches.at(1)}
      PreTag={PreTag}
      style={highlighterStyle}
      customStyle={highlighterCustomStyle}
    >
      {children.toString().trim()}
    </SyntaxHighlighter>
  );
}

function PreTag(props: ComponentProps<'pre'>) {
  return (
    <div className={clsx(styles.base, styles.codeBlock)}>
      {props.children}
    </div>
  );
}
