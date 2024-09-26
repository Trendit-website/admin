import Icons from "../../Shared/Icons";
import { UseGetGlobalActivities } from "../../../api/useGetActivities";
import { useState } from "react";
import Image from "next/image";
const GlobalActivities = () => {
  const activities = [
    {
      image: "/assets/avatar.png",
      name: "Demi",
      taskType: "Advert",
      platform: "facebook",
    },
    {
      image: "/assets/avatar.png",
      name: "Demi",
      taskType: "Advert",
      platform: "facebook",
    },
    {
      image: "/assets/avatar.png",
      name: "Demi",
      taskType: "Advert",
      platform: "facebook",
    },
  ];
  const [activePage, setActivePage] = useState<number>(1);
  const { globalActivities, isError, isLoading } =
    UseGetGlobalActivities(activePage);
  const pages = Array.from(
    { length: globalActivities?.pages ?? 1 },
    (_, i) => i + 1,
  );
  const viewPage = (page: number) => {
    setActivePage(page);
  };
  return (
    <div className="flex flex-col gap-y-6 h-[463px] w-[342px] py-4 px-4 overflow-scroll bg-[#FFFFFF] rounded-[12px] text-primary-black">
      <p className="text-[14]">Global Activities</p>
      {isLoading && (
        <div className="w-full flex justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isError && (
        <div className="w-full flex justify-center text-red-500">
          {isError?.response?.data?.message ||
            "An error occure try again later"}
        </div>
      )}
      {globalActivities?.global_activities && (
        <>
          <div className="flex flex-col gap-y-4">
            {globalActivities?.global_activities?.map((item, index) => (
              <div className="flex items-start gap-x-2 text-[14px]" key={index}>
                <Image
                  src="/assets/Logo.svg"
                  alt="holder"
                  className="w-[32px] h-[32px] rounded-[200px]"
                  width={32}
                  height={32}
                />
                <div className="flex flex-col gap-y-[4px]">
                  <span>{item.title}</span>
                  <p>
                    {item?.body} <span className="text-main">View</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center text-main text-[12px] gap-x-2 justify-center">
            {pages.map((page, index) => (
              <p
                onClick={() => viewPage(page)}
                key={index}
                className={`${activePage === page ? "text-main font-semibold" : "text-primary-black"} text-[12px]`}
              >
                {page}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default GlobalActivities;
