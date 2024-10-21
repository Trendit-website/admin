import Icons from "../../../Shared/Icons";
import Image from "next/image";
import { UserDetailsSchema } from "../../../../utils/schema/userSchema";
import { UseCapitalise } from "../../../../utils/useCapitalise";
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
        <table className="overflow-y-scroll">
          <tbody className="flex flex-col gap-y-6">
            {details?.referral_metrics?.referral_history?.map((item, index) => (
              <tr
                key={index}
                className="flex items-center justify-between px-4 border-solid border-b-[1px] border-borderColor pb-2"
              >
                <td className="flex items-center gap-x-2">
                  <Image
                    src="/assets/Logo.svg"
                    width={40}
                    className="w-[40px] h-[40px] rounded-[200px]"
                    alt="referral avatar"
                    height={40}
                  />
                  <p>{item?.username}</p>
                </td>
                <td className="text-green-500">
                  {UseCapitalise(item?.status)}
                </td>
              </tr>
            ))}
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
