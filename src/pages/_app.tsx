import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { NextPage } from "next";
import { ReactNode, ReactElement } from "react";
import { useRouter } from "next/router";
import Login from "./Login";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>{router.route === "/Login" ? <Login /> : <Layout>{page}</Layout>}</>
    ));
  return <>{getLayout(<Component {...pageProps} />)}</>;
}