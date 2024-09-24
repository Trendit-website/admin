import { Inter } from "next/font/google";
import { Red_Hat_Display } from "next/font/google";
import { useAccessToken } from "../hooks/useAccessToken";
import { useRouter } from "next/router";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
const RedHat = Red_Hat_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function Home() {
  const { token } = useAccessToken();
  const router = useRouter();
  useEffect(() => {
    if (token !== null) {
      router.push("/dashboard");
    } else {
      router.push("/Login");
    }
  });
  return <></>;
}
