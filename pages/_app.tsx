import { FC, useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps as Props } from 'next/app';
import { useRouter } from 'next/router';
import * as fathom from 'fathom-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'tailwindcss/tailwind.css';

const queryClient = new QueryClient();

const App: FC<Props> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    fathom.load(process.env.NEXT_PUBLIC_FATHOM_CODE, {
      includedDomains: [process.env.NEXT_PUBLIC_FATHOM_DOMAIN],
    });

    router.events.on('routeChangeComplete', fathom.trackPageview);

    return () => {
      router.events.off('routeChangeComplete', fathom.trackPageview);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <DefaultSeo
        dangerouslySetAllPagesToNoIndex={Boolean(process.env.NEXT_PUBLIC_IN_DEV_MODE) || false}
        titleTemplate="%s | Your App"
        defaultTitle="Your App"
        openGraph={{
          title: 'Your App',
          description: 'Your App description',
          type: 'website',
          locale: 'en_US',
          url: 'https://yourdomain.com/',
          site_name: 'Your App',
          images: [{ url: 'https://yourdomain.com/open-graph.png' }],
        }}
        twitter={{
          handle: '@yourtwitter',
          site: '@yourtwitter',
          cardType: 'summary_large_image',
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
