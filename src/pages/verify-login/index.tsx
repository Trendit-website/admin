import { useRouter } from "next/router";
import { UseVerifyLogin } from "@/api/useVerifyLogin";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyLogin = () => {
  const router = useRouter();
  useEffect(() => {
    UseVerifyLogin(router.query?.token)
      .then((response) => {
        router.push("/dashboard");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.query?.token, router]);
  return <div></div>;
};
export default VerifyLogin;
