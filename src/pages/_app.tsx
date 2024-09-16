import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { NextPage } from "next";
import { ReactNode, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./Login";
import ToastProvider from "@/Providers/ToastProvider";
import { useAccessToken } from "@/hooks/useAccessToken";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  // const {token: access_token} = useAccessToken()
  // console.log(access_token)
  // useEffect(() => {
  //     if(router.route === '/verify-login') {
  //      ''
  //     } else {
  //     access_token ?
  //     router.push('/dashboard') :
  //     router.push('/Login')
  //     }
  // }, [router.query.token, access_token])
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <ToastProvider />
        <NextUIProvider>
          {router.route === "/Login" && <Login />}
          {router.route === "/" && ""}
          {router.route !== "/login" &&
            router.route !== "/" &&
            router.route !== "verify-login" && <Layout>{page}</Layout>}
        </NextUIProvider>
      </>
    ));
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
