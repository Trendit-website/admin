import Icons from "@/components/Shared/Icons";
import Link from "next/link";
const UserSocialAccount = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="flex w-full flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[18px] text-primary-black">
          {activeTab}
        </h4>
        <div>
          <Icons type="vertical-dot" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start px-2 py-4 gap-x-4 rounded-[4px] bg-[#FFFFFF] w-12/12 border-solid border-[1px] border-borderColor">
          <Icons type="facebook" />
          <div className="flex flex-col gap-y-[3px]">
            <p className="text-[15px] text-primary-black">Erik ten Hag</p>
            <Link href="" className="text-[12px] text-secondary">
              http://facebook.com/stephen.oyeshola.1/?_rdr
            </Link>
            <div className="flex items-center justify-center w-[84px] h-[22px] rounded-[16px] gap-x-[5px] border-[1px] border-solid border-[#067467] bg-[#ABEFC6] text-[#067467] text-[12px]">
              <Icons type="verified-icon" />
              Verified
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[125px] w-[32px] h-[28px] border-[1px] border-solid border-[#DADADA]">
            <Icons type="horizontal-dot" />
          </div>
        </div>
        <div className="flex items-start px-2 py-4 gap-x-4 rounded-[4px] bg-[#FFFFFF] w-12/12 border-solid border-[1px] border-borderColor">
          <Icons type="facebook" />
          <div className="flex flex-col gap-y-[3px]">
            <p className="text-[15px] text-primary-black">Erik ten Hag</p>
            <Link href="" className="text-[12px] text-secondary">
              http://facebook.com/stephen.oyeshola.1/?_rdr
            </Link>
            <div className="flex items-center justify-center w-[84px] h-[22px] rounded-[16px] gap-x-[5px] border-[1px] border-solid border-[#067467] bg-[#ABEFC6] text-[#067467] text-[12px]">
              <Icons type="verified-icon" />
              Verified
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[125px] w-[32px] h-[28px] border-[1px] border-solid border-[#DADADA]">
            <Icons type="horizontal-dot" />
          </div>
        </div>
        <div className="flex items-start px-2 py-4 gap-x-4 rounded-[4px] bg-[#FFFFFF] w-12/12 border-solid border-[1px] border-borderColor">
          <Icons type="facebook" />
          <div className="flex flex-col gap-y-[3px]">
            <p className="text-[15px] text-primary-black">Erik ten Hag</p>
            <Link href="" className="text-[12px] text-secondary">
              http://facebook.com/stephen.oyeshola.1/?_rdr
            </Link>
            <div className="flex items-center justify-center w-[84px] h-[22px] rounded-[16px] gap-x-[5px] border-[1px] border-solid border-[#067467] bg-[#ABEFC6] text-[#067467] text-[12px]">
              <Icons type="verified-icon" />
              Verified
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[125px] w-[32px] h-[28px] border-[1px] border-solid border-[#DADADA]">
            <Icons type="horizontal-dot" />
          </div>
        </div>
        <div className="flex items-start px-2 py-4 gap-x-4 rounded-[4px] bg-[#FFFFFF] w-12/12 border-solid border-[1px] border-borderColor">
          <Icons type="facebook" />
          <div className="flex flex-col gap-y-[3px]">
            <p className="text-[15px] text-primary-black">Erik ten Hag</p>
            <Link href="" className="text-[12px] text-secondary">
              http://facebook.com/stephen.oyeshola.1/?_rdr
            </Link>
            <div className="flex items-center justify-center w-[84px] h-[22px] rounded-[16px] gap-x-[5px] border-[1px] border-solid border-[#067467] bg-[#ABEFC6] text-[#067467] text-[12px]">
              <Icons type="verified-icon" />
              Verified
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[125px] w-[32px] h-[28px] border-[1px] border-solid border-[#DADADA]">
            <Icons type="horizontal-dot" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSocialAccount;
