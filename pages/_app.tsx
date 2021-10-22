import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { GlobalStyle } from "../common/global";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default MyApp;
