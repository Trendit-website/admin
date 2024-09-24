import InputField from "@/components/Shared/InputField";
import { useState } from "react";
import Ordertable from "./ordertable";
const Order = () => {
  const Tabs = ["Pending", "In Review", "Failed", "Completed", "Cancelled"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  return (
    <div className="flex flex-col bg-[#FFFFFF] w-11/12 rounded-[12px] gap-y-4">
      <Ordertable />
    </div>
  );
};
export default Order;
