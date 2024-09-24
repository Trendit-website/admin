import Icons from "@/components/Shared/Icons";
import { useState } from "react";
const SocialMedia = () => {
  const Tabs = [
    "Advert Task",
    "Engagement Task",
    "Post Adverts",
    "Engagement Adverts",
  ];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [isToggled, setIsToggled] = useState(true);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className="flex flex-col gap-y-8 px-6">
      <div className="w-full py-3 text-[18px] text-primary-black ">
        Social Media
      </div>
      <div className="flex items-center gap-x-6 text-primary-black w-10/12 border-b-[1px] border-solid border-borderColor">
        {Tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${activeTab === tab && "text-main cursor-pointer border-main border-solid border-b-[1px]"}`}
          >
            {tab}
          </p>
        ))}
      </div>
      <table className="w-full flex flex-col m-auto border-solid border-[1px] border-borderColor rounded-[8px]">
        <thead className="w-full bg-[#F5F5F5] text-primary-black py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
          <tr className="flex items-center">
            <td className="flex items-center gap-x-2 w-7/12">
              <Icons type="checkbox" />
              Type
            </td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-y-4 text-secondary w-full text-[12px]">
          <tr className="flex items-center w-full py-4 px-2 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-11/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Facebook
                <span className="text-secondary text-[12px]">On</span>
              </div>
            </td>
            <td className="w-2/12 ml-14">
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={isToggled}
                  onChange={handleToggle}
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 ${
                    isToggled ? "bg-customPurple" : ""
                  }`}
                />
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 transform ${
                    isToggled ? "translate-x-6" : ""
                  }`}
                />
              </label>
            </td>
          </tr>
          <tr className="flex items-center w-full py-4 px-2 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-11/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Facebook
                <span className="text-secondary text-[12px]">On</span>
              </div>
            </td>
            <td className="w-2/12 ml-14">
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={isToggled}
                  onChange={handleToggle}
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 ${
                    isToggled ? "bg-customPurple" : ""
                  }`}
                />
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 transform ${
                    isToggled ? "translate-x-6" : ""
                  }`}
                />
              </label>
            </td>
          </tr>
          <tr className="flex items-center w-full py-4 px-2 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-11/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Facebook
                <span className="text-secondary text-[12px]">On</span>
              </div>
            </td>
            <td className="w-2/12 ml-14">
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={isToggled}
                  onChange={handleToggle}
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 ${
                    isToggled ? "bg-customPurple" : ""
                  }`}
                />
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 transform ${
                    isToggled ? "translate-x-6" : ""
                  }`}
                />
              </label>
            </td>
          </tr>
          <tr className="flex items-center w-full py-4 px-2 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-11/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Facebook
                <span className="text-secondary text-[12px]">On</span>
              </div>
            </td>
            <td className="w-2/12 ml-14">
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={isToggled}
                  onChange={handleToggle}
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 ${
                    isToggled ? "bg-customPurple" : ""
                  }`}
                />
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 transform ${
                    isToggled ? "translate-x-6" : ""
                  }`}
                />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default SocialMedia;
