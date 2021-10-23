import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { GlobalStyle } from "../common/global";
import { SessionProvider } from "next-auth/react";
import { PersonContextProvider } from "../context/person-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PersonContextProvider>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersonContextProvider>
    </SessionProvider>
  );
}
export default MyApp;
