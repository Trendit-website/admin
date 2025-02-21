import { useState } from "react";
import Icons from "../Shared/Icons";
import SecuritySetting from "./SettingDetails/SecuritySetting";
import Admins from "./SettingDetails/Admins";
import Pricing from "./SettingDetails/Pricing";
import Prefrence from "./SettingDetails/Prefrence";
import SocialMedia from "./SettingDetails/SocialMedia";
import { useDisclosure } from "@nextui-org/react";
const Setting = () => {
  const Tabs = ["Admin", "Pricing"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const showModal = () => {
    onOpen();
  };
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
          {activeTab === "Admin" && (
            <button
              onClick={() => showModal()}
              className="flex items-center justify-around bg-main text-[#FFFFFF] w-[117px] h-[36px] py-[2px] px-[6px] rounded-[6px]"
            >
              Create
              <Icons type="plus" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-start bg-[#FFFFFF] py-2 w-10/12 h-[867px] m-auto rounded-[12px] border-[1px] border-solid border-borderColor">
        <div className="text-primary-black cursor-pointer w-3/12 h-full flex flex-col gap-y-4 px-4 py-4 border-solid border-r-[1px] border-borderColor">
          {Tabs.map((tab, index) => (
            <p key={index} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? "text-main" : ""} cursor-pointer`}>
              {tab}
            </p>
          ))}
        </div>
        <div className="w-9/12">
          {/* {activeTab === Tabs[0] && <SecuritySetting />} */}
          {activeTab === Tabs[0] && (
            <Admins isOpen={isOpen} onClose={onClose} />
          )}
          {activeTab === Tabs[1] && <Pricing />}
          {/* {activeTab === Tabs[2] && <Prefrence />}
          {activeTab === Tabs[3] && <SocialMedia />} */}
        </div>
      </div>
    </div>
  );
};
export default Setting;
