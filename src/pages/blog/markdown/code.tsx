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
import styled from 'styled-components';

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
    return <InlineCode className={className}>{children}</InlineCode>;
  }
  if (!shouldHighlightSyntax) {
    return <CodeBlock className={className}>{children}</CodeBlock>;
  }
  return (
    <SyntaxHighlighter
      language={matches.at(1)}
      PreTag={CodeBlockWrapper}
      style={highlighterStyle}
      customStyle={highlighterCustomStyle}
    >
      {children.toString().trim()}
    </SyntaxHighlighter>
  );
}

const Base = styled.code`
  border-radius: 6px;
  font-size: 0.8em;
  font-family: ui-monospace, 'Cascadia Mono', 'Segoe UI Mono',
    'Ubuntu Mono', 'Roboto Mono', Menlo, Monaco, Consolas, monospace;
`;
const InlineCode = styled(Base)`
  display: inline-block;
  line-height: initial;
  padding: 2px 6px;
  color: var(--color-dark-gray);
  background-color: var(--color-light-gray);
  word-break: break-word;
`;
const CodeBlock = styled(Base)`
  display: block;
  padding: 12px 20px;
  overflow-x: auto;
  color: var(--color-light-gray);
  background-color: var(--color-black);
`;
const CodeBlockWrapper = styled(CodeBlock).attrs({ as: 'div' })``;
