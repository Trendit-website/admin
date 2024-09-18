import { useRouter } from "next/router";
import { useVerifyLogin } from "@/api/useVerifyLogin";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyLogin = () => {
  const router = useRouter();
  const VerifyLogin = useVerifyLogin(router.query?.token);
  console.log(VerifyLogin);
  return <div></div>;
};
export default VerifyLogin;
