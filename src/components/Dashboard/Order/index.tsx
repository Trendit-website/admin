import InputField from "@/components/Shared/InputField";
import { useState } from "react";
import Ordertable from "./ordertable";
const Order = () => {
  const Tabs = ["Pending", "In Review", "Failed", "Completed", "Cancelled"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  return (
    <div className="flex flex-col bg-[#FFFFFF] w-11/12 rounded-[12px] gap-y-4">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-primary-black flex items-center gap-x-2">
          {Tabs.map((tab, index) => (
            <div
              key={index}
              className="w-[104px] flex items-center gap-x-2 justify-center"
            >
              <p onClick={() => setActiveTab(tab)} className="text-[16px]">
                {tab}
              </p>{" "}
              {activeTab === Tabs[index] && (
                <span className="text-[12px] flex items-center justify-center border-solid border-b-[1px] border-[#E4E7EC] w-[28px] h-[22px] rounded-[16px] bg-[#F9FAFB]">
                  12
                </span>
              )}
            </div>
          ))}
        </div>
        <InputField
          type="text"
          classNames="w-[320px] border-solid border-[2px] pl-4 rounded-[8px] border-[#D0D5DD] py-2"
          placeholder="Search"
        />
      </div>
      <Ordertable />
    </div>
  );
};
export default Order;
