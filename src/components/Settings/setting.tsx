import { useState } from "react";
import Icons from "../Shared/Icons";
import SecuritySetting from "./SettingDetails/SecuritySetting";
import Admins from "./SettingDetails/Admins";
import Pricing from "./SettingDetails/Pricing";
import Prefrence from "./SettingDetails/Prefrence";
import SocialMedia from "./SettingDetails/SocialMedia";
const Setting = () => {
  const Tabs = ["Security", "Admin", "Pricing", "Prefrence", "Social media"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex flex-col m-auto text-primary-black gap-y-8 py-6 w-10/12">
        <div className="flex items-center justify-between w-full m-auto">
          <h1 className="flex flex-col text-[30px] font-bold">
            Settings
            <span className="text-[#667185] text-[14px] font-normal">
              Check and filter all your medical appointments here
            </span>
          </h1>
          <div className="flex items-center justify-around bg-main text-[#FFFFFF] w-[117px] h-[36px] py-[2px] px-[6px] rounded-[6px]">
            Create
            <Icons type="plus" />
          </div>
        </div>
      </div>
      <div className="flex items-start bg-[#FFFFFF] py-2 w-10/12 h-[867px] m-auto rounded-[12px] border-[1px] border-solid border-borderColor">
        <div className="text-primary-black w-3/12 h-full flex flex-col gap-y-4 px-4 py-4 border-solid border-r-[1px] border-borderColor">
          {Tabs.map((tab, index) => (
            <p key={index} onClick={() => setActiveTab(tab)}>
              {tab}
            </p>
          ))}
        </div>
        <div className="w-9/12">
          {activeTab === Tabs[0] && <SecuritySetting />}
          {activeTab === Tabs[1] && <Admins />}
          {activeTab === Tabs[2] && <Pricing />}
          {activeTab === Tabs[3] && <Prefrence />}
          {activeTab === Tabs[4] && <SocialMedia />}
        </div>
      </div>
    </div>
  );
};
export default Setting;