import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="min-h-screen antialiased text-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
