import Image from "next/image";
import Icons from "../../Shared/Icons";
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
  return (
    <div className="flex flex-col gap-y-6 h-[463px] w-[342px] py-4 px-4 overflow-scroll bg-[#FFFFFF] rounded-[12px] text-primary-black">
      <p className="text-[14]">Live Activities</p>
      <div className="flex flex-col gap-y-8">
        {activities.map((item, index) => (
          <div className="flex items-start gap-x-2 text-[14px]" key={index}>
            <Icons type={item.platform} />
            <div className="flex flex-col">
              <span className="text-main">@{item.name}</span>
              <p className="text-[#475467]">
                {`Just performed your 'Post ${item.taskType} on ${item.platform} Page' task. Awaiting Approval`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center gap-x-2 justify-center text-main text-[12px]">
        View more <Icons type="dropdown" />
      </div>
    </div>
  );
};
export default GlobalActivities;
