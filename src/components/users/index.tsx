import { useState } from "react";
import Icons from "../Shared/Icons";
import UsersTable from "./UsersTable/usersTable";
import EarnersTable from "./UsersTable/earnersTable";
import AdvertisersTable from "./UsersTable/advertisersTable";
import AffiliatesTable from "./UsersTable/affiliatesTable";
const Users = () => {
  const tabs = ["All Users", "Earners", "Advertisers", "Affliates"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="w-full flex flex-col gap-y-12 py-8">
      <div className="flex items-center m-auto justify-between w-10/12">
        <div className="flex flex-col gap-y-2">
          <h3 className="font-bold text-primary-black text-[30px]">Users</h3>
          <span className="text-[14px] text-[#667185]">
            Check and filter all your medical appointments here
          </span>
        </div>
        <div className="flex items-center justify-center py-2 gap-x-2 w-[117px] h-[35px] rounded-[8px] bg-[#CB29BE]">
          Create <Icons type="plus" />
        </div>
      </div>
      <div
        className={`flex items-center border-b-[1px] border-solid border-borderColor gap-x-8 text-[14px] text-[#344054] w-10/12 m-auto`}
      >
        {tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${activeTab === tab ? "text-main border-b-[1px] border-solid border-main" : "text-secondary"}`}
          >
            {tab}
          </p>
        ))}
      </div>
      {activeTab === tabs[0] && <UsersTable />}
      {activeTab === tabs[1] && <EarnersTable />}
      {activeTab === tabs[2] && <AdvertisersTable />}
      {activeTab === tabs[3] && <AffiliatesTable />}
    </div>
  );
};
export default Users;