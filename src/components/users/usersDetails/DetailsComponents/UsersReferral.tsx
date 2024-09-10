import Icons from "@/components/Shared/Icons";
import Image from "next/image";
const UsersReferral = () => {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="flex items-center justify-between">
        Referral Activities
        <Icons type="vertical-dot" />
      </div>
      <table>
        <tbody className="flex flex-col gap-y-6">
          <tr className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2">
            <td className="flex items-center gap-x-2">
              <Image
                src="/assets/avatar.png"
                width={40}
                alt="referral avatar"
                height={40}
              />
              <p>Olivia John</p>
            </td>
            <td className="text-green-500">+ #249.00</td>
          </tr>
          <tr className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2">
            <td className="flex items-center gap-x-2">
              <Image
                src="/assets/avatar.png"
                width={40}
                alt="referral avatar"
                height={40}
              />
              <p>Olivia John</p>
            </td>
            <td className="text-green-500">+ #249.00</td>
          </tr>
          <tr className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2">
            <td className="flex items-center gap-x-2">
              <Image
                src="/assets/avatar.png"
                width={40}
                alt="referral avatar"
                height={40}
              />
              <p>Olivia John</p>
            </td>
            <td className="text-green-500">+ #249.00</td>
          </tr>
          <tr className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2">
            <td className="flex items-center gap-x-2">
              <Image
                src="/assets/avatar.png"
                width={40}
                alt="referral avatar"
                height={40}
              />
              <p>Olivia John</p>
            </td>
            <td className="text-green-500">+ #249.00</td>
          </tr>
          <tr className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2">
            <td className="flex items-center gap-x-2">
              <Image
                src="/assets/avatar.png"
                width={40}
                alt="referral avatar"
                height={40}
              />
              <p>Olivia John</p>
            </td>
            <td className="text-green-500">+ #249.00</td>
          </tr>
          <tr className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2">
            <td className="flex items-center gap-x-2">
              <Image
                src="/assets/avatar.png"
                width={40}
                alt="referral avatar"
                height={40}
              />
              <p>Olivia John</p>
            </td>
            <td className="text-green-500">+ #249.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default UsersReferral;
