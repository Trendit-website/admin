import Image from "next/image";
import Link from "next/link";
import Icons from "../Shared/Icons";
import { ReactNode } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
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
          <div>
            <Icons type="alarm" />
          </div>
          <div>
            <Image
              src="/assets/Logo.svg"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
};
export default Layout;
