import Icons from "@/components/Shared/Icons";
import Image from "next/image";
import UsersDetailsComponent from "./UsersDetails";
import Link from "next/link";
import { UseGetUsersDetails } from "@/api/useGetUsers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserDetailsSchema } from "@/utils/userSchema";
const UsersDetails = () => {
  const router = useRouter();
  const [userdetails, setUserDetails] = useState<UserDetailsSchema>();
  useEffect(() => {
    UseGetUsersDetails(Number(router.query?.id))
      .then((response) => {
        setUserDetails(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userdetails]);
  return (
    <div className="flex flex-col gap-y-6 px-4 py-8 w-full text-[#667185]">
      <div className="flex items-center w-full px-4 gap-x-2 text-[14px]">
        <Link href="/users">
          <p className="flex items-center gap-x-2">
            <Icons type="arrow-back" />
            Back
          </p>
        </Link>
        <p className="text-[14px]">
          Earn / <span className="text-main">Create Facebook</span>
        </p>
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <div>
          <p className="text-primary-black font-bold text-[30px]">Users</p>
          <span className="text-[14px]">
            Task ID: RET/15118/{userdetails?.user.id}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <button className="flex items-center bg-[#CB29BE] py-[8px] px-[12px] rounded-[8px] text-[#ffffff] text-[14px]">
            Action
            <Icons type="dropdown" fill="#FFFFFF" />
          </button>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col gap-y-2">
        <Image
          src={userdetails?.user?.profile_picture || "/assets/Logo.svg"}
          width={64}
          height={64}
          className="w-[64px] h-[64px] rounded-[200px]"
          alt="profile picture"
        />
        <p className="text-primary-black text-[16px]">
          {userdetails?.user?.full_name}
        </p>
        <span className="text-secondary text-[14px]">
          USER ID: RET/15118/{userdetails?.user.id}
        </span>
        <div className="flex items-center w-[74px] gap-x-2 bg-[#CB29BE] text-white text-[12px] py-[2px] px-[6px] rounded-[16px]">
          Verified <Icons type="mark" />
        </div>
      </div>
      <UsersDetailsComponent details={userdetails} />
    </div>
  );
};
export default UsersDetails;
