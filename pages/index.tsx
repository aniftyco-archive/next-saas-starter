import { Fragment } from 'react';
import { NextPage } from 'next';
import { NextSeo as Meta } from 'next-seo';
import { HelloWorld } from '@app/components/HelloWorld';

const IndexPage: NextPage = () => (
  <Fragment>
    <Meta title="Next SaaS App" />
    <HelloWorld />
  </Fragment>
);

export default IndexPage;
