import Icons from "@/components/Shared/Icons";
import { UseCapitalise } from "@/utils/useCapitalise";
import { UserDetailsSchema } from "@/utils/userSchema";
import Link from "next/link";
const UserSocialAccount = ({ activeTab, details }: { activeTab: string, details: UserDetailsSchema | undefined }) => {
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
      <div className="grid grid-cols-2 gap-4 overflow-y-scroll">
        {
          details?.social_profiles.map((social, index) => (
            <div key={index} className="flex items-start px-2 py-4 gap-x-4 rounded-[4px] bg-[#FFFFFF] w-12/12 border-solid border-[1px] border-borderColor">
            <Icons type={social?.platform} />
            <div className="flex flex-col gap-y-[3px]">
              <p className="text-[15px] text-primary-black">{details?.user?.full_name}</p>
              <Link href={social?.link} className="text-[12px] text-secondary">
                {social?.link?.slice(0, 25)}
              </Link>
              <div className={`flex items-center justify-center w-[84px] h-[22px] rounded-[16px] gap-x-[5px] border-[1px] border-solid ${
                social?.status === 'verified' ? 'border-[#067467] bg-[#ABEFC6] text-[#067467]' : social?.status === 'pending' ? 'border-[#FEDF89] bg-[#FFAEB] text-[#FEDF89]' : 'border-[#FECDCA] bg-[#FFAEB] text-red-500'
              } text-[12px]`}>
                <Icons type={`${social?.status}-icon`} />
                {UseCapitalise(social?.status)}
              </div>
            </div>
            <div className="flex items-center justify-center rounded-[125px] w-[32px] h-[28px] border-[1px] border-solid border-[#DADADA]">
              <Icons type="horizontal-dot" />
            </div>
          </div>            
          ))
        }
      </div>
    </div>
  );
};
export default UserSocialAccount;
