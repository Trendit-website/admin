import {
  UseGetOrders,
  UseGetPendingOrders,
  UseGetApprovedOrders,
  UseGetFailedOrders,
} from "@/api/useGetOrders";
import { useState, useReducer } from "react";
import InputField from "@/components/Shared/InputField";
import AllOrders from "./orderTables/AllOrder";
import PendingOrders from "./orderTables/PendingOrders";
import ApprovedOrders from "./orderTables/ApprovedOrders";
import FailedOrders from "./orderTables/FailedOrders";

const Ordertable = () => {
  const [activePage, setActivePage] = useState(1);
  const { orders } = UseGetOrders(activePage);
  const { pendingOrders } = UseGetPendingOrders(1);
  const { approvedOrders } = UseGetApprovedOrders(1);
  const { failedOrders } = UseGetFailedOrders(1);
  const Tabs = ["All", "Pending", "Approved", "Cancelled"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const reducer = (state: any, action: string) => {
    switch (action) {
      case Tabs[0]:
        return (state = orders);
      case Tabs[1]:
        return (state = pendingOrders);
      case Tabs[2]:
        return (state = approvedOrders);
      case Tabs[3]:
        return (state = failedOrders);
    }
  };
  const [state, dispatch] = useReducer(reducer, orders);
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-primary-black flex items-center gap-x-2 w-full">
          {Tabs.map((tab, index) => (
            <div
              key={index}
              className={`w-[114px] flex items-center cursor-pointer justify-center pb-2 ${activeTab === tab ? "text-main border-solid border-b-[1px] border-main" : ""}`}
            >
              <p
                onClick={() => {
                  dispatch(tab);
                  setActiveTab(tab);
                }}
                className="text-[16px]"
              >
                {tab}
              </p>{" "}
              {activeTab === tab && (
                <span className="text-[12px] flex items-center justify-center border-solid border-b-[1px] border-[#E4E7EC] w-[28px] h-[22px] rounded-[16px] bg-[#F9FAFB]">
                  {state?.total ? String(state?.total) : orders?.total}
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
      <div className="text-primary-black w-full px-4">
        <div className="bg-[#FFFFFF] flex flex-col gap-y-4 py-6 text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
          {activeTab === Tabs[0] && <AllOrders />}
          {activeTab === Tabs[1] && <PendingOrders />}
          {activeTab === Tabs[2] && <ApprovedOrders />}
          {activeTab === Tabs[3] && <FailedOrders />}
        </div>
      </div>
    </>
  );
};
export default Ordertable;
