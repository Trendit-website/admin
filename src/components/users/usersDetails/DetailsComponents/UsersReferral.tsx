import Icons from "@/components/Shared/Icons";
import Image from "next/image";
import { UserDetailsSchema } from "@/utils/schema/userSchema";
const UsersReferral = ({
  details,
}: {
  details: UserDetailsSchema | undefined;
}) => {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="flex items-center justify-between">
        Referral Activities
        <Icons type="vertical-dot" />
      </div>
      {details?.referral_metrics.referral_history?.length !== 0 && (
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
      )}
      {details?.referral_metrics.referral_history.length === 0 && (
        <div className="flex w-full items-center justify-center">
          No referrals
        </div>
      )}
    </div>
  );
};
export default UsersReferral;
