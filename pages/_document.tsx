import { FC } from 'react';
import { DocumentProps as Props, Head, Html, Main, NextScript } from 'next/document';

const Document: FC<Props> = () => {
  return (
    <Html>
      <Head />
      <body className="min-h-screen bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
