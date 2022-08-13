import NextHead from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const theme = extendTheme({
  fonts: {
    body: "'Nunito Sans', sans-serif",
    heading: "'Nunito Sans', sans-serif",
  },
  styles: {
    global: {
      body: {
        fontSize: 15,
        bgColor: "gray.50",
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3, // 3 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <NextHead>
          <title>Hal Test</title>
        </NextHead>

        <Component {...pageProps} />
      </ChakraProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
