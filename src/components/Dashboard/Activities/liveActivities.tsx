import Icons from "@/components/Shared/Icons";
import Image from "next/image";
const LiveActivities = () => {
  const activities = [
    {
      image: "/assets/avatar.png",
      name: "Demi Wikinson",
      taskType: "Advert",
      platform: "Facebook",
    },
    {
      image: "/assets/avatar.png",
      name: "Demi Wikinson",
      taskType: "Advert",
      platform: "Facebook",
    },
    {
      image: "/assets/avatar.png",
      name: "Demi Wikinson",
      taskType: "Advert",
      platform: "Facebook",
    },
  ];
  return (
    <div className="flex flex-col gap-y-6 h-[463px] w-[342px] py-4 px-4 overflow-scroll bg-[#FFFFFF] rounded-[12px] text-primary-black">
      <p className="text-[14]">Live Activities</p>
      <div className="flex flex-col gap-y-4">
        {activities.map((item, index) => (
          <div className="flex items-start gap-x-2 text-[14px]" key={index}>
            <Image src={item.image} alt="" width={32} height={32} />
            <div className="flex flex-col gap-y-[4px]">
              <span>{item.name}</span>
              <p>
                {`Just performed your 'Post ${item.taskType} on ${item.platform} Page' task. Awaiting Approval`}{" "}
                <span className="text-main">View</span>
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
export default LiveActivities;
