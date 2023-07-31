import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
import { applyThemeOnFirstLoad } from 'src/utils/theme';

const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH;

export default class CustomDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;
    try {
      context.renderPage = () => {
        return originalRenderPage({
          enhanceApp(App) {
            return (props) => {
              return sheet.collectStyles(<App {...props} />);
            };
          },
        });
      };
      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="zh-Hant-TW">
        <Head>
          <link
            rel="icon"
            sizes="any"
            href={`/favicon.ico?v=${commitHash}`}
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href={`/favicon.svg?v=${commitHash}`}
          />
          <link
            rel="apple-touch-icon"
            href={`/apple-touch-icon.png?v=${commitHash}`}
          />
          <link
            rel="manifest"
            href={`/manifest.webmanifest?v=${commitHash}`}
          />
          <Script
            strategy="beforeInteractive"
            id="apply-theme-on-first-load"
          >
            {minifyJavaScript(
              `(${applyThemeOnFirstLoad.toString()})();`
            )}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

function minifyJavaScript(snippet: string): string {
  // See: https://chat.openai.com/share/9e677c6b-daa6-4dde-b989-f9901758300e
  return (
    snippet
      // Remove comments (single-line and multi-line)
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
      // Remove line breaks and multiple whitespaces
      .replace(/\s+/g, ' ')
      // Remove whitespaces around symbols
      .replace(
        /\s*([{}()[\].,;:+\-*/%&|^!=<>?~]|==|===|!=|!==|\+=|-=|\*=|\/=|%==|&&|\|\||<<|>>|>>>)\s*/g,
        '$1'
      )
  );
}
