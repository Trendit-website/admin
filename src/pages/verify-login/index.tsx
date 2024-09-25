import { useRouter } from "next/router";
import { UseVerifyLogin } from "../../api/useVerifyLogin";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/Shared/Button";

const VerifyLogin = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(true);
  useEffect(() => {
    if (router.isReady) {
      UseVerifyLogin(router.query?.token)
        .then((response) => {
          sessionStorage.setItem("access_token", response.data?.access_token);
          setIsVerified(true);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          router.push("/Login");
        });
    }
  }, [router.isReady]);
  return (
    isVerified && (
      <div className="w-full h-screen text-center flex flex-col gap-y-2 items-center text-primary-black justify-center">
        Verification Successfull click the button below to access the admin
        dashboard <br />
        <Button
          clickFunction={() => router.push("/dashboard")}
          label="Proceed to dashboard"
          classNames="bg-main text-[#FFFFFF] py-2 px-2 rounded-[10px]"
        />
      </div>
    )
  );
};
export default VerifyLogin;
