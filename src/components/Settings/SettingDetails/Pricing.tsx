import { UseGetPricing } from "@/api/usePricing";
import Icons from "@/components/Shared/Icons";
import { useState } from "react";
const Pricing = () => {
  const Tabs = [
    "Advert Task",
    "Engagement Task",
    "Post Adverts",
    "Engagement Adverts",
  ];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const { pricing, isLoadingPrice, isError } = UseGetPricing();
  console.log(pricing);
  return (
    <div className="flex flex-col gap-y-8">
      <div className="w-full px-4 py-3 text-[18px] text-primary-black ">
        Pricing
      </div>
      <div className="flex items-center px-6 gap-x-6 text-primary-black w-10/12 border-b-[1px] border-solid border-borderColor">
        {Tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${activeTab === tab && "text-main border-main border-solid border-b-[1px]"}`}
          >
            {tab}
          </p>
        ))}
      </div>
      <table className="w-11/12 flex flex-col m-auto ">
        <thead className="w-full bg-[#F5F5F5] text-primary-black py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
          <tr className="flex items-center">
            <td className="flex items-center gap-x-2 w-7/12">
              <Icons type="checkbox" />
              Type
            </td>
            <td className="w-2/12">Task Count</td>
            <td className="w-2/12">Price/Post</td>
            <td className="w-2/12">Last Updated</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-y-4 text-secondary text-[12px]">
          <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-7/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Post adverts on your Facebook page
                <span className="text-secondary text-[12px]">
                  Post adverts of various businesses and top brands on your
                  Facebook Page
                </span>
              </div>
            </td>
            <td className="w-2/12 ml-14">127</td>
            <td className="w-2/12">#110</td>
            <td className="w-2/12">Feb 22, 2024</td>
            <td>
              <Icons type="vertical-dot" />
            </td>
          </tr>
          <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-7/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Post adverts on your Facebook page
                <span className="text-secondary text-[12px]">
                  Post adverts of various businesses and top brands on your
                  Facebook Page
                </span>
              </div>
            </td>
            <td className="w-2/12 ml-14">127</td>
            <td className="w-2/12">#110</td>
            <td className="w-2/12">Feb 22, 2024</td>
            <td>
              <Icons type="vertical-dot" />
            </td>
          </tr>
          <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-7/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Post adverts on your Facebook page
                <span className="text-secondary text-[12px]">
                  Post adverts of various businesses and top brands on your
                  Facebook Page
                </span>
              </div>
            </td>
            <td className="w-2/12 ml-14">127</td>
            <td className="w-2/12">#110</td>
            <td className="w-2/12">Feb 22, 2024</td>
            <td>
              <Icons type="vertical-dot" />
            </td>
          </tr>
          <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-7/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Post adverts on your Facebook page
                <span className="text-secondary text-[12px]">
                  Post adverts of various businesses and top brands on your
                  Facebook Page
                </span>
              </div>
            </td>
            <td className="w-2/12 ml-14">127</td>
            <td className="w-2/12">#110</td>
            <td className="w-2/12">Feb 22, 2024</td>
            <td>
              <Icons type="vertical-dot" />
            </td>
          </tr>
          <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
            <td className="flex items-start gap-x-[5px] w-7/12">
              <Icons type="facebook" />
              <div className="flex flex-col text-primary-black text-[14px]">
                Post adverts on your Facebook page
                <span className="text-secondary text-[12px]">
                  Post adverts of various businesses and top brands on your
                  Facebook Page
                </span>
              </div>
            </td>
            <td className="w-2/12 ml-14">127</td>
            <td className="w-2/12">#110</td>
            <td className="w-2/12">Feb 22, 2024</td>
            <td>
              <Icons type="vertical-dot" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Pricing;
