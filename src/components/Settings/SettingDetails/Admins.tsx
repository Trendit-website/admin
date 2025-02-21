import Icons from "../../Shared/Icons";
import Image from "next/image";
import { UseGetAdmins } from "../../../api/useGetAdmins";
import CreateAdminModal from "../../Modals/CreateAdminModal";
import { format } from "date-fns";
const Admins = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { admins, isLoadingAdmins, isErrorAdmins } = UseGetAdmins()
  return (
    <>
      <table className="w-11/12 flex flex-col m-auto ">
        <thead className="w-full bg-[#F5F5F5] text-primary-black py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
          <tr className="flex items-center">
            <td className="flex items-center gap-x-2 w-6/12">
              <Icons type="checkbox" />
              Name
            </td>
            <td className="w-4/12">Roles</td>
            <td className="w-4/12">Date Added</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-4">
          {isLoadingAdmins && !isErrorAdmins && (
            <div className="w-full flex justify-center py-8">
              <Icons type="loader" />
            </div>
          )}
          {isErrorAdmins && (
            <div className="w-full flex items-center text-red-500 justify-center py-10">
              An error occured try again later
            </div>
          )}
          {admins &&
            admins?.users.map((admin: any, index: number) => (
              <tr
                key={index}
                className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
              >
                <td className="flex items-center gap-x-[7px] w-6/12">
                  <Icons type="checkbox" />
                  {admin?.profile_picture ? (
                    <Image
                      src={admin?.profile_picture || "assets/avatar.png"}
                      width={40}
                      height={40}
                      className="rounded-[200px] w-[40px] h-[40px]"
                      alt="avatar"
                    />
                  ) : (
                    <div className="w-[40px] h-[40px] rounded-[200px]">
                      <Icons type="profile" width={30} height={30} />
                    </div>
                  )}
                  <div className="flex flex-col text-primary-black text-[14px]">
                    {admin?.full_name}
                    <span className="text-secondary text-[12px]">
                      {admin?.email}
                    </span>
                  </div>
                </td>
                <td className="w-4/12 flex flex-col">
                  {admin.roles?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </td>
                <td className="w-4/12">{format(new Date(admin?.date_joined), "MMM dd, yyyy")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <CreateAdminModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
export default Admins;
