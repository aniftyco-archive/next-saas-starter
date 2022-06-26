import { Fragment } from 'react';
import Head from 'next/head';
import { HelloWorld } from '@app/components/HelloWorld';

const IndexPage = () => (
  <Fragment>
    <Head>
      <title>Next SaaS App</title>
    </Head>
    <HelloWorld />
  </Fragment>
);

export default IndexPage;
