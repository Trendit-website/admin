import Icons from "../../Shared/Icons";
import Image from "next/image";
import Link from "next/link";
import bg from "../../../../../public/assets/Background pattern decorative.png";
import { useRef, useState } from "react";
import UserSocialAccount from "./DetailsComponents/UserSocialAccount";
import UsersDeatailsInsight from "./DetailsComponents/UsersDetailsInsight";
import Userstransaction from "./DetailsComponents/Userstransaction";
import UsersReferral from "./DetailsComponents/UsersReferral";
import { UserDetailsSchema } from "../../../utils/schema/userSchema";
import UserActivities from "./DetailsComponents/UsersActivities";
import toast from "react-hot-toast";
const UsersDetailsComponent = ({
  details,
}: {
  details: UserDetailsSchema | undefined;
}) => {
  const tabs = [
    "Insights",
    "Activities",
    "Transactions",
    "Linked Account",
    "Referral List",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const detailsRef = useRef<HTMLDivElement>()
  const copyDetails = () => {
    if(detailsRef) {
      const text = detailsRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        toast.success("Details Copied")
      })
    }
  }
  return (
    <div className="flex items-start justify-between gap-x-6 w-full">
      <div className="flex flex-col w-4/12 h-[537px] bg-[#F9FAFC] px-4 gap-y-4 py-4 rounded-[12px] border-solid border-[1px] border-borderColor">
        <div className="flex items-center pb-2 justify-between border-solid border-b-[1px] border-borderColor">
          <p className="text-[18px] text-primary-black">Details</p>
          <button onClick={() => copyDetails()} className="flex items-center gap-x-[3px] text-secondary">
            <Icons type="copy" />
            Copy
          </button>
        </div>
        <div ref={detailsRef} className="flex flex-col gap-y-8 w-full px-2">
          <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
            <div className="flex items-center gap-x-[5px]">
              <Icons type="phone" />
              Phone Number
            </div>
            <div className="">{details?.user?.phone}</div>
          </div>
          <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
            <div className="flex items-center gap-x-[5px]">
              <Icons type="email" />
              Email
            </div>
            <div>{details?.user?.email}</div>
          </div>
          <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
            <div className="flex items-center gap-x-[5px]">
              <Icons type="flag" />
              Nationality
            </div>
            <div>{details?.user?.country}</div>
          </div>
          <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
            <div className="flex items-center gap-x-[5px]">
              <Icons type="religion" />
              Religion
            </div>
            <div>{details?.user?.religion}</div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
              <div className="flex items-center gap-x-[5px]">
                <Icons type="region" />
                Region
              </div>
              <div>
                {details?.user?.local_government}, {details?.user?.state}
              </div>
            </div>
            <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
              <div className="flex items-center gap-x-[5px]">
                <Icons type="gender" />
                Gender
              </div>
              <div>{details?.user?.gender}</div>
            </div>
          </div>
          {/* <div className="flex flex-col gap-y-2 text-[12px] text-secondary">
            <div className="flex items-center gap-x-[5px]">
              <Icons type="trophy" />
              Survey Summary
            </div>
            <div className="text-[#1671D9]">
              I am a earner. I got to know Trendit from Facebook
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col w-11/12 gap-y-10 font-normal text-secondary text-[14px] h-[628px] bg-[#F9FAFC] px-4 gap-y-4 py-4 rounded-[12px] border-solid border-[1px] border-borderColor">
        <div className="flex items-center gap-x-10 w-9/12 border-b-[1px] border-solid border-borderColor">
          {tabs.map((tab, index) => (
            <div
              onClick={() => setActiveTab(tab)}
              key={index}
              className={`text-[14px] pb-6 cursor-pointer font-normal ${activeTab === tab ? "text-main cursor-pointer border-b-[1px] border-solid border-main" : "text-[#344054]"}`}
            >
              {tab}
            </div>
          ))}
        </div>
        {activeTab === tabs[0] && (
          <UsersDeatailsInsight activeTab={tabs[0]} details={details} />
        )}
        {activeTab === tabs[1] && <UserActivities details={details} />}
        {activeTab === tabs[2] && <Userstransaction details={details} />}
        {activeTab === tabs[3] && (
          <UserSocialAccount activeTab={tabs[3]} details={details} />
        )}
        {activeTab === tabs[4] && <UsersReferral details={details} />}
      </div>
    </div>
  );
};
export default UsersDetailsComponent;
