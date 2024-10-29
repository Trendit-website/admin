import Image from "next/image";
import { UseGetNotifications } from "../../api/useGetNotifications";
import { useState } from "react";
import Icons from "../Shared/Icons";
import { format } from "date-fns";
const NotificationDropdown = () => {
  const [activePage, setActivePage] = useState(1);
  const { notification, isLoadingNotification, isNotificationError } =
    UseGetNotifications(activePage);
  const NextPage = () => {
    if (notification?.pages) {
      activePage !== notification?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (notification?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="absolute top-20 shadow-xl flex flex-col gap-y-4 bg-[#FFFFFF] text-primary-black w-[400px] h-[400px] overflow-y-scroll rounded-[8px] z-40 px-4 pb-6">
      {isLoadingNotification && (
        <div className="w-full flex items-center justify-center py-4">
          <Icons type="loader" />
        </div>
      )}
      {isNotificationError && (
        <div className="w-full flex items-center justify-center py-4">
          {isNotificationError?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {notification && (
        <>
          <div className="flex items-center border-solid border-b-[1px] border-[#E4E7EC] justify-between py-2">
            <p className="text-[16px]">Notifications</p>
            <span className="text-[12px] text-main">
              Several unread messages
            </span>
          </div>
          <div className="flex flex-col gap-y-4 text-[12px]">
            {notification?.notifications?.map((notification, index) => (
              <div key={index} className="flex items-start justify-between border-solid border-b-[1px] border-[#E4E7EC] py-4">
                <div className="flex items-start gap-x-2">
                {
                notification?.profile_picture ? 
                  <Image
                    src={notification?.profile_picture}
                    alt="holder"
                    className="w-[32px] h-[32px] rounded-[200px]"
                    width={32}
                    height={32}
                  /> : 
                  <div className="w-[24px] h-[24px] rounded-[200px]">
                    <Icons type="profile" />
                  </div>
               }
                  <div className="w-8/12">
                    <p className="font-semibold">{notification?.title}</p>
                    <span className="text-[10px]">{notification?.body}</span>
                  </div>
                </div>
                <div className="text-main flex items-center">
                  {format(new Date(notification?.created_at), "MMM dd")}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center justify-center gap-x-4">
            <div
              onClick={() => PrevPage()}
              className="flex cursor-pointer items-center gap-x-[6px] px-[5px] py-[5px] rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              <Icons type="prev" />
            </div>
            <div
              onClick={() => NextPage()}
              className="flex items-center cursor-pointer gap-x-[6px] px-[5px] py-[5px] rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              <Icons type="next" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default NotificationDropdown;
