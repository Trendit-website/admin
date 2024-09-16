import Icons from "@/components/Shared/Icons";
import Image from "next/image";
const Admins = () => {
  return (
    <table className="w-11/12 flex flex-col m-auto ">
      <thead className="w-full bg-[#F5F5F5] text-primary-black py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
        <tr className="flex items-center">
          <td className="flex items-center gap-x-2 w-6/12">
            <Icons type="checkbox" />
            Name
          </td>
          <td className="w-2/12">Roles</td>
          <td className="w-2/12">Date Added</td>
          <td className="w-2/12">Last Active</td>
        </tr>
      </thead>
      <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-4">
        <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
          <td className="flex items-center gap-x-[3px] w-6/12">
            <Icons type="checkbox" />
            <Image
              src="/assets/avatar.png"
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="flex flex-col text-primary-black text-[14px]">
              Olivia Rhyno
              <span className="text-secondary text-[12px]">
                olivia@gmail.com
              </span>
            </div>
          </td>
          <td className="w-2/12">Customer care</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td>
            <Icons type="vertical-dot" />
          </td>
        </tr>
        <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
          <td className="flex items-center gap-x-[3px] w-6/12">
            <Icons type="checkbox" />
            <Image
              src="/assets/avatar.png"
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="flex flex-col text-primary-black text-[14px]">
              Olivia Rhyno
              <span className="text-secondary text-[12px]">
                olivia@gmail.com
              </span>
            </div>
          </td>
          <td className="w-2/12">Customer care</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td>
            <Icons type="vertical-dot" />
          </td>
        </tr>
        <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
          <td className="flex items-center gap-x-[3px] w-6/12">
            <Icons type="checkbox" />
            <Image
              src="/assets/avatar.png"
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="flex flex-col text-primary-black text-[14px]">
              Olivia Rhyno
              <span className="text-secondary text-[12px]">
                olivia@gmail.com
              </span>
            </div>
          </td>
          <td className="w-2/12">Customer care</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td>
            <Icons type="vertical-dot" />
          </td>
        </tr>
        <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
          <td className="flex items-center gap-x-[3px] w-6/12">
            <Icons type="checkbox" />
            <Image
              src="/assets/avatar.png"
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="flex flex-col text-primary-black text-[14px]">
              Olivia Rhyno
              <span className="text-secondary text-[12px]">
                olivia@gmail.com
              </span>
            </div>
          </td>
          <td className="w-2/12">Customer care</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td>
            <Icons type="vertical-dot" />
          </td>
        </tr>
        <tr className="flex items-center py-4 border-borderColor border-b-[1px] border-solid">
          <td className="flex items-center gap-x-[3px] w-6/12">
            <Icons type="checkbox" />
            <Image
              src="/assets/avatar.png"
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="flex flex-col text-primary-black text-[14px]">
              Olivia Rhyno
              <span className="text-secondary text-[12px]">
                olivia@gmail.com
              </span>
            </div>
          </td>
          <td className="w-2/12">Customer care</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td className="w-2/12">Feb 22, 2024</td>
          <td>
            <Icons type="vertical-dot" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Admins;
