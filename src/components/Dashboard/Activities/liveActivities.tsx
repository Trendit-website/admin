import { useState } from "react";
import { UseGetLiveActivities } from "../../../api/useGetActivities";
import Icons from "../../Shared/Icons";
import Image from "next/image";
const LiveActivities = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const { liveActivities, isLoading, isError } =
    UseGetLiveActivities(activePage)
  const NextPage = () => {
    if (liveActivities?.pages) {
      activePage !== liveActivities?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (liveActivities?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="flex flex-col gap-y-6 h-[433px] w-[342px] py-4 px-4 overflow-scroll bg-[#FFFFFF] rounded-[12px] text-primary-black">
      <p className="text-[14]">Live Activities</p>
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
      {liveActivities?.live_activities && (
        <>
          <div className="flex flex-col gap-y-4">
            {liveActivities?.live_activities?.map((item, index) => (
              <div className="flex items-start gap-x-2 text-[14px]" key={index}>
                {item?.profile_picture ? (
                  <Image
                    src={item?.profile_picture}
                    alt="holder"
                    className="w-[32px] h-[32px] rounded-[200px]"
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="w-[24px] h-[24px] rounded-[200px]">
                    <Icons type="profile" />
                  </div>
                )}
                <div className="flex flex-col gap-y-[4px] -mt-[5px]">
                  <span>{item.title}</span>
                  <p>
                    {item?.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center justify-center gap-x-4">
            <div
              onClick={() => PrevPage()}
              className="flex cursor-pointer items-center gap-x-[6px] px-[5px] py-[5px] rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              <Icons type="prev" fill="#CB29BE" />
            </div>
            <div
              onClick={() => NextPage()}
              className="flex items-center cursor-pointer gap-x-[6px] px-[5px] py-[5px] rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              <Icons type="next" fill="#CB29BE" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default LiveActivities;
