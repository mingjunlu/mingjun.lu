import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
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
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { Header, Metadata } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import { site } from 'src/constants';
import { Post, getPostBySlug, getPosts } from 'src/utils/post';
import PostMetadata from './post-metadata';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('sass', sass);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);

const remarkPlugins: PluggableList = [
  [remarkGfm, { singleTilde: false }],
];
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

type Params = {
  slug: string;
};
type BlogPostProps = Post;

export default function BlogPost(props: BlogPostProps) {
  const {
    title,
    content,
    publishedAt,
    slug,
    tags,
    summary,
    featuredImage = '',
  } = props;

  return (
    <>
      <Metadata
        title={title}
        description={summary}
        image={featuredImage}
        url={`${site.url}/blog/${slug}`}
      />
      <Container>
        <Header />
        <Main>
          <PostMetadata publishedAt={publishedAt} tags={tags} />
          {!!featuredImage && (
            <ImageWrapper>
              <Image fill priority src={featuredImage} alt="" />
            </ImageWrapper>
          )}
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            components={{
              a(aProps) {
                const { href, children } = aProps;
                return (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {children}
                  </Link>
                );
              },
              blockquote(blockquoteProps) {
                const { children } = blockquoteProps;
                return <Blockquote>{children}</Blockquote>;
              },
              code(codeProps) {
                const { children, inline, className } = codeProps;
                const matches = /language-(\w+)/.exec(
                  className ?? ''
                );
                const shouldHighlightSyntax = !!matches;
                if (inline) {
                  return (
                    <InlineCode className={className}>
                      {children}
                    </InlineCode>
                  );
                }
                if (!shouldHighlightSyntax) {
                  return (
                    <CodeBlock className={className}>
                      {children}
                    </CodeBlock>
                  );
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
              },
              h1(h1Props) {
                const { children } = h1Props;
                return <Heading>{children}</Heading>;
              },
              hr() {
                return <HiddenHorizontalLine />;
              },
              img(imgProps) {
                const { src, alt, title } = imgProps;
                return (
                  <LazyImage src={src} alt={alt} title={title} />
                );
              },
              table(tableProps) {
                const { children } = tableProps;
                return <Table>{children}</Table>;
              },
            }}
          >
            {content.trim()}
          </ReactMarkdown>
        </Main>
      </Container>
    </>
  );
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<Params>
> {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => {
      const params: Params = {
        slug: post.slug,
      };
      return {
        params,
      };
    }),
    fallback: false,
  };
}
export async function getStaticProps(
  context: GetStaticPropsContext<Params>
): Promise<GetStaticPropsResult<BlogPostProps>> {
  if (!context.params) {
    throw new Error('Invalid context params');
  }
  const post = await getPostBySlug(context.params.slug);
  return {
    props: post,
  };
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 18px 20px;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
  @media ${queries.tabletAndWider} {
    padding: 60px;
    max-width: 754px;
    margin: 0 auto;
  }
`;
const Main = styled.article`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 42px 0;

  @media ${queries.tabletAndWider} {
    gap: 24px;
    font-size: 18px;
    line-height: 1.8;
    width: 100%;
    padding: 54px 0;
    margin: 0 auto;

    > aside {
      order: 0;
    }
  }

  // prettier-ignore
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.4;
    font-weight: 600;
  }
  pre {
    width: 100%;
  }
`;
const ImageWrapper = styled.figure`
  position: relative;
  aspect-ratio: 16 / 9;

  > img {
    object-fit: cover;
    border-radius: 6px;
    background-color: var(--color-light-gray);
  }
`;
const Link = styled.a`
  color: inherit;
  text-underline-offset: 4px;
`;
const Blockquote = styled.blockquote`
  padding: 16px 30px;
  border-left: 4px solid var(--color-dark-gray);
  background-color: var(--color-light-gray);
`;
const Code = styled.code`
  border-radius: 6px;
  font-size: 0.8em;
  font-family: ui-monospace, 'Cascadia Mono', 'Segoe UI Mono',
    'Ubuntu Mono', 'Roboto Mono', Menlo, Monaco, Consolas, monospace;
`;
const InlineCode = styled(Code)`
  display: inline-block;
  line-height: initial;
  padding: 2px 6px;
  background-color: var(--color-light-gray);
  word-break: break-word;
`;
const CodeBlock = styled(Code)`
  display: block;
  padding: 12px 20px;
  overflow-x: auto;
  color: var(--color-light-gray);
  background-color: var(--color-black);
`;
const CodeBlockWrapper = styled(CodeBlock).attrs({ as: 'div' })``;
const Heading = styled.h1`
  order: -1;

  @media ${queries.tabletAndWider} {
    font-size: 2em;
  }
`;
const HiddenHorizontalLine = styled.hr`
  visibility: hidden;
`;
const LazyImage = styled.img.attrs({ loading: 'lazy' })`
  margin: 0 auto;
`;
const Table = styled.table`
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid var(--color-french-gray);
  }
  // prettier-ignore
  th, td {
    padding: 6px;
  }
`;
