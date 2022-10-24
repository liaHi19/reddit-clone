import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra/theme";

import Layout from "../components/Layout/Layout";
import MainProvider from "../providers/MainProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </MainProvider>
  );
}

export default MyApp;
