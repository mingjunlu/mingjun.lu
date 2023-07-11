import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
