import { FunctionComponent } from 'react';
import 'tailwindcss/tailwind.css';

type Props = {
  Component: FunctionComponent;
  pageProps: Record<string, any>;
};

const App: FunctionComponent<Props> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
