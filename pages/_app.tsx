import { FunctionComponent } from 'react';
import { AppProps as Props } from 'next/app';
import 'tailwindcss/tailwind.css';

const App: FunctionComponent<Props> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
