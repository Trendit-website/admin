import { useEffect, useState } from "react";
import Activities from "./Activities";
import AdminProfile from "./adminProfile";
import OverviewReport from "./Report/overviewReport";
import SignupReport from "./Report/signupReport";
import Order from "./Order";
import SocialLinkRequest from "./Social-Link-Request";
import Appeal from "./Appeal";
import { useRouter, useSearchParams } from "next/navigation";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const Tabs = ["Overview", "Orders", "Social link Request"];
  const [activeTab, setActiveTab] = useState(currentTab || Tabs[0])
  useEffect(() => {
    if(currentTab) {
      setActiveTab(currentTab)
    }
  }, [currentTab])
  const router = useRouter()
  return (
    <section className="w-11/12 flex items-start py-12 gap-x-10">
      <div className="flex flex-col gap-y-6 w-full">
        <AdminProfile />
        <div className="flex items-center px-10 pl-12 gap-x-8 w-10/12 pb-2 -mb-4">
          {Tabs.map((tab, index) => (
            <p
              key={index}
              onClick={() => (setActiveTab(tab), router.push(`/dashboard?tab=${tab}`))}
              className={`text-[14px] font-medium cursor-pointer text-[#344504] pb-[7px] ${activeTab === tab ? "border-b-[1px] border-solid border-main text-main font-semibold" : ""}`}
            >
              {tab}
            </p>
          ))}
        </div>
        {activeTab === Tabs[0] && (
          <div className="w-full">
            <div className="flex flex-col gap-y-4 pl-8">
              <OverviewReport />
              <SignupReport />
            </div>
          </div>
        )}
        {activeTab === Tabs[1] && <Order />}
        {activeTab === Tabs[2] && <SocialLinkRequest tab={activeTab}/>}
        {activeTab === Tabs[3] && <Appeal />}
      </div>
      {activeTab === Tabs[0] && <Activities />}
    </section>
  );
};
export default Dashboard;
