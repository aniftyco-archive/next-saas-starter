import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../src/pages/index';

test('renders app', () => {
  const { asFragment } = render(<Index />, {});
  expect(asFragment()).toMatchSnapshot();
});
