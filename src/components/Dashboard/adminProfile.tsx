import Image from "next/image";
import Icons from "../Shared/Icons";
import { UseGetAdminProfile } from "../../api/useGetAdmins";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminProfile = () => {
  const { admin, isLoadingAdmin, isError } = UseGetAdminProfile();
  const router = useRouter();
  console.log(admin);
  useEffect(() => {
    if (isError) {
      router.push("/Login");
    }
  }, [isError]);
  return (
    <div className="flex items-start px-10 gap-x-4 w-10/12">
      {admin && (
        <>
          <div className="flex flex-col w-[65px] h-[65px] rounded-full items-center justify-center">
            <Image
              src={admin?.profile_picture}
              alt="trendit logo"
              width={56}
              height={56}
              className="-mb-4 w-[56px] h-[56px] rounded-[200px]"
            />
            {admin.membership_fee && (
              <span className="self-end">
                <Icons type="verified" />
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-primary-black text-[28px] font-semibold">
              {admin.full_name}
            </p>
            <ul className="flex items-center list-disc gap-x-6 pl-4 text-primary-black text-[14px]">
              {admin.roles?.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>
        </>
      )}
      {isLoadingAdmin && (
        <div className="w-full flex items-center justify-center">
          <Icons type="loader" />
        </div>
      )}
    </div>
  );
};
export default AdminProfile;
