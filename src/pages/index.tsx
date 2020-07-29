import { Fragment } from 'react';
import Head from 'next/head';
import { HelloWorld } from 'components/HelloWorld';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Next Tailwind CSS</title>
      </Head>

      <HelloWorld />
    </Fragment>
  );
}
