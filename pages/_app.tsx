import type { AppProps } from "next/app";
import NextHead from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Nunito Sans', sans-serif",
    heading: "'Nunito Sans', sans-serif",
  },
  styles: {
    global: {
      body: {
        bgColor: "gray.50",
      },
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextHead>
        <title>Hal Test</title>
      </NextHead>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
