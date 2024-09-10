import Image from "next/image";
import Icons from "../Shared/Icons";

const AdminProfile = () => {
  return (
    <div className="flex items-start gap-x-4 w-10/12">
      <div className="flex flex-col w-[65px] h-[65px] rounded-full items-center justify-center">
        <Image
          src="/assets/avatar.png"
          alt="trendit logo"
          width={56}
          height={56}
          className="-mb-4"
        />
        <span className="self-end">
          <Icons type="verified" />
        </span>
      </div>
      <div className="flex flex-col">
        <p className="text-primary-black text-[28px] font-semibold">
          Amarachi Okoro
        </p>
        <span className="text-[14px] text-[#475467]">Super Admin</span>
      </div>
    </div>
  );
};
export default AdminProfile;
