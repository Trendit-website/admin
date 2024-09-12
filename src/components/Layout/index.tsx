import Image from "next/image";
import Link from "next/link";
import Icons from "../Shared/Icons";
import { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const Tabs = ["Dashboard", "Users", "Tasks", "Transctions"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  return (
    <div>
      <header className="w-full bg-[#FFFFFF] hidden lg:flex items-center justify-around h-[72px] py-4">
        <Link href="/" onClick={() => setActiveTab(Tabs[0])}>
          <Image
            src="/assets/Logo.svg"
            alt="Trendit logo"
            width={101}
            height={40}
          />
        </Link>
        <div
          className={`flex items-center gap-x-8 text-[#344054] text-[16px] font-bold text-RedHat`}
        >
          <Link
            href="/"
            onClick={() => setActiveTab(Tabs[0])}
            className={`py-2 px-2 ${activeTab === Tabs[0] ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/users"
            onClick={() => setActiveTab(Tabs[1])}
            className={`py-2 px-2 ${activeTab === Tabs[1] ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            <div>Users</div>
          </Link>
          <Link
            href="/task"
            onClick={() => setActiveTab(Tabs[2])}
            className={`py-2 px-2 ${activeTab === Tabs[2] ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
          >
            Tasks
          </Link>
          <Link
            href="/transactions"
            onClick={() => setActiveTab(Tabs[3])}
            className={`py-2 px-2 ${activeTab === Tabs[3] ? "text-main border-b-[1px] border-solid border-main bg-[#FFF0FF]" : "text-primary-black"}`}
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
          <Link href='/settings'>
          <div>
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
