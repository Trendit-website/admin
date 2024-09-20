import Image from "next/image";
import InputField from "../Shared/InputField";
import Button from "../Shared/Button";
import { useForm } from "react-hook-form";
import { UseLogin } from "@/api/useLogin";
import { LoginSchema } from "@/utils/loginSchema";
import toast from "react-hot-toast";
import { useState } from "react";
import Icons from "../Shared/Icons";

const LoginForm = () => {
  const form = useForm<LoginSchema>();
  const [isLoading, setLoading] = useState<boolean>();
  const { register, handleSubmit, watch } = form;
  const fieldContent = watch("email");
  const Login = (data: LoginSchema) => {
    setLoading(true);
    UseLogin(data)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col w-full h-full gap-y-4 items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <Image src="/assets/Logo.svg" alt="" width={132} height={51} />
      </div>
      <div className="flex flex-col items-center text-RedHat justify-center gap-y-4  bg-[#FFFFFF] w-[520px] h-[320px] rounded-[12px]">
        <h1 className="text-[#101828] text-[24px] font-bold">Welcome Admin</h1>
        <span className="text-[#475467] text-[16px] text-center w-[280px]">
          Turn Daily Social Tasks into Paychecks! Get Paid for your Engagements.
        </span>
        <form
          onSubmit={handleSubmit(Login)}
          className="flex flex-col justify-center gap-y-4"
        >
          <InputField
            classNames="border-[1px] text-primary-black text-[14px] outline-none border-solid border-[#DOD5DD] rounded-[8px] py-2 pl-2 w-[440px] bg-transparent"
            type="email"
            placeholder="Enter your email"
            id="email"
            register={register("email", {
              required: true,
            })}
          />
          <Button
            label={
              isLoading ? (
                <div className="w-full flex items-center justify-center">
                  <Icons type="loader" />
                </div>
              ) : (
                `Send login link`
              )
            }
            disabled={fieldContent ? false : true}
            classNames={`w-full py-2 rounded-[8px] text-[#FFFFFF] text-[16px] font-bold ${fieldContent ? "bg-[#CB29BE]" : "bg-[#CB29BE] opacity-40"}`}
          />
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
