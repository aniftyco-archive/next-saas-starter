import React, { FunctionComponent } from 'react';
import { render } from '@testing-library/react';
import _App from '../../src/pages/_app';

const NoopComponent: FunctionComponent = () => null;

test('_app', () => {
  const { asFragment } = render(
    <_App Component={NoopComponent} pageProps={{}} />,
    {}
  );
  expect(asFragment()).toMatchSnapshot();
});
