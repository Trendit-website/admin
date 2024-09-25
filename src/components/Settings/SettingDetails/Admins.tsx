import Icons from "../../Shared/Icons";
import Image from "next/image";
import { UseGetAdmins } from "../../../api/useGetAdmins";
const Admins = () => {
  const { admins, isLoadingAdmins, isErrorAdmins } = UseGetAdmins();
  const getAdminRole = (roles: any[]) => {
    for (const role of roles) {
      if (role === "Admin" || role === "Junior Admin") {
        return role;
      }
    }
  };
  return (
    <table className="w-11/12 flex flex-col m-auto ">
      <thead className="w-full bg-[#F5F5F5] text-primary-black py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
        <tr className="flex items-center">
          <td className="flex items-center gap-x-2 w-7/12">
            <Icons type="checkbox" />
            Name
          </td>
          <td className="w-2/12">Roles</td>
          <td className="w-2/12">Date Added</td>
          <td className="w-2/12">Last Active</td>
        </tr>
      </thead>
      <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-4">
        {isLoadingAdmins && !isErrorAdmins &&(
          <div className="w-full flex items-center justify-center py-8">
            <Icons type="loader" />
          </div>
        )}
        {isErrorAdmins && (
          <div className="w-full flex items-center justify-center py-10">
            An error occured try again later
          </div>
        )}
        {admins &&
          admins?.users.map((admin: any, index: number) => (
            <tr
              key={index}
              className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
            >
              <td className="flex items-center gap-x-[7px] w-7/12">
                <Icons type="checkbox" />
                <Image
                  src={admin?.profile_picture || "/assets/Logo.svg"}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="w-[40px] h-[40px] rounded-[200px]"
                />
                <div className="flex flex-col text-primary-black text-[14px]">
                  {admin?.full_name}
                  <span className="text-secondary text-[12px]">
                    {admin?.email}
                  </span>
                </div>
              </td>
              <td className="w-2/12">{getAdminRole(admin?.roles)}</td>
              <td className="w-2/12">Feb 22, 2024</td>
              <td className="w-2/12">Feb 22, 2024</td>
              <td>
                <Icons type="vertical-dot" />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default Admins;
