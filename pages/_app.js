import "../styles/globals.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { theme } from "../components/themeConfig";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ColorModeScript />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
