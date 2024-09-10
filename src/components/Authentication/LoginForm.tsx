import Image from "next/image";
import InputField from "../Shared/InputField";
import Button from "../Shared/Button";
import Link from "next/link";
const LoginForm = () => {
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
        <InputField
          classNames="border-[1px] text-primary-black text-[14px] outline-none border-solid border-[#DOD5DD] rounded-[8px] py-2 pl-2 w-[440px] bg-transparent"
          type="email"
          placeholder="Enter your email"
        />
        <Link href="/">
          <Button
            label="Send login link"
            classNames="bg-[#CB29BE] w-[440px] py-2 rounded-[8px] text-[#FFFFFF] text-[16px] font-bold"
          />
        </Link>
      </div>
    </div>
  );
};
export default LoginForm;
