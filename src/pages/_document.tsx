import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="antialiased text-gray-900 min-h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
