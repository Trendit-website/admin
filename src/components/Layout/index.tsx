import Image from "next/image";
import Link from "next/link";
import Icons from "../Shared/Icons";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import NotificationDropdown from "./NotificationDropdown";
import { UseGetAdminProfile } from "../../api/useGetAdmins";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isNotification, showNotification] = useState<boolean>(false);
  const { admin } = UseGetAdminProfile();
  return (
    <div>
      <header className="w-full bg-[#FFFFFF] hidden lg:flex items-center justify-around h-[72px] py-4">
        <Link href="/dashboard">
          <Image
            src="/assets/Logo.svg"
            alt="Trendit logo"
            width={101}
            height={40}
          />
        </Link>
        <div
          className={`flex items-center gap-x-8 text-[#344054] text-[16px] font-bold`}
        >
          <Link
            href="/dashboard"
            className={`py-2 px-2 ${router.route === "/dashboard" ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/users"
            className={`py-2 px-2 ${router.route === "/users" ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            <div>Users</div>
          </Link>
          <Link
            href="/task"
            className={`py-2 px-2 ${router.route === "/task" ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            Tasks
          </Link>
          <Link
            href="/transactions"
            className={`py-2 px-2 ${router.route === "/transactions" ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            Transactions
          </Link>
          <Link
            href="/marketplace"
            className={`py-2 px-2 ${router.route === "/marketplace" ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            MarketPlace
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <div>
            <span>
              <Icons type="search" />
            </span>
          </div>
          <Link href="/settings">
            <div
              className={
                router.route === "/settings"
                  ? "bg-[#FFF0FF] px-[5px] py-[5px]"
                  : ""
              }
            >
              <Icons type="settings" />
            </div>
          </Link>
          <div
            onClick={() => showNotification(!isNotification)}
            className="-mt-2 cursor-pointer"
          >
            <div className="ml-[7px] flex items-center justify-center text-[#FFFFFF] text-[8px]">
              <span className="">
                {" "}
                <Icons type="dot" />{" "}
              </span>
            </div>
            <Icons type="alarm" />
          </div>
          <div className="-mt-[14px]">
            {admin?.profile_picture ? (
              <Image
                src={admin?.profile_picture}
                alt="trendit logo"
                width={40}
                height={40}
                className="-mb-4 w-[40px] h-[40px] rounded-[200px]"
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-[200px]">
                <Icons type="profile" width={35} height={35} />
              </div>
            )}
          </div>
        </div>
      </header>
      {isNotification && (
        <div className="w-full flex items-center justify-end pr-4">
          <NotificationDropdown />
        </div>
      )}
      <div className="-z-20">{children}</div>
    </div>
  );
};
export default Layout;
