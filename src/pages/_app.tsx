import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { NextPage } from "next";
import { ReactNode, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./Login";
import ToastProvider from "@/Providers/ToastProvider";
import { useAccessToken } from "@/hooks/useAccessToken";
import VerifyLogin from "./verify-login"
import { Red_Hat_Display } from "next/font/google";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const RedHat = Red_Hat_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { token } = useAccessToken();
  const [isLogin, setLogin] = useState<boolean>();
  useEffect(() => {
    if (router.route !== "/verify-login" && router.route !== "/Login") {
      if (token === null) {
        setLogin(false);
        router.push("/Login");
      } else {
        setLogin(true);
      }
    }
  });
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <main className={RedHat.className}>
        <ToastProvider />
        <NextUIProvider>
          {router.route === "/Login" && <Login />}
          {router.route === "/" && ""}
          {router.route === "/verify-login" && <VerifyLogin />}
          {router.route !== "/Login" &&
            router.route !== "/" &&
            router.route !== "/verify-login" &&
            isLogin && <Layout>{page}</Layout>}
        </NextUIProvider>
      </main>
    ));
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
