import Icons from "@/components/Shared/Icons";
import Image from "next/image";
import DetailsComponent from "./detailsComponent";
import Orderperformers from "./Orderperformers";
import Link from "next/link";
const OrderDetails = () => {
  return (
    <div className="flex flex-col gap-y-6 px-4 py-8 w-full text-[#667185]">
      <div className="flex items-center w-full px-4 gap-x-2 text-[14px]">
        <Link href="/">
          <p className="flex items-center gap-x-2">
            <Icons type="arrow-back" />
            Back
          </p>
        </Link>
        <p className="text-[14px]">
          Earn / <span className="text-main">Create Facebook</span>
        </p>
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <div>
          <p className="text-primary-black font-bold text-[30px]">
            Engagement Task
          </p>
          <span className="text-[14px]">Task ID: RET/15118/A</span>
        </div>
        <div className="flex items-center gap-x-2">
          <button className="flex items-center bg-[#E4E7EC] py-[8px] px-[12px] rounded-[8px] text-primary-black text-[14px]">
            Decline
          </button>
          <button className="flex items-center bg-[#CB29BE] py-[8px] px-[12px] rounded-[8px] text-[#ffffff] text-[14px]">
            Approve
            <Icons type="mark" />
          </button>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col gap-y-2">
        <Image
          src="/assets/avatar.png"
          width={64}
          height={64}
          alt="profile picture"
        />
        <p className="text-primary-black text-[16px]">David Fayemi</p>
        <span className="text-secondary text-[14px]">USER ID: RET/15118/A</span>
        <div className="flex items-center w-[74px] gap-x-2 bg-[#CB29BE] text-white text-[12px] py-[2px] px-[6px] rounded-[16px]">
          Verified <Icons type="mark" />
        </div>
      </div>
      <DetailsComponent />
      {/* <Orderperformers /> */}
    </div>
  );
};
export default OrderDetails;
