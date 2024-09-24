import Icons from "../../../Shared/Icons";
import { UseCapitalise } from "../../../../utils/useCapitalise";
import { UserDetailsSchema } from "../../../../utils/schema/userSchema";
import { format } from "date-fns";
const UserActivities = ({
  details,
}: {
  details: UserDetailsSchema | undefined;
}) => {
  return (
    <div className="flex w-full flex-col gap-y-6 h-[537px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[18px] text-primary-black">
          Activities
        </h4>
        <div>
          <Icons type="vertical-dot" />
        </div>
      </div>
      {details?.task_activity?.activities?.length !== 0 && (
        <div className="flex flex-col gap-y-4">
          {details?.task_activity?.activities?.map((activity, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between px-6"
            >
              <div className="flex items-start gap-x-2">
                <Icons type={activity?.platform} />
                <div className="flex flex-col gap-y-[2px] text-main">
                  @{details?.user?.username}
                  <span className="text-[12px] text-secondary">
                    {activity?.status === "completed" &&
                      `Earned  ${details?.user?.wallet?.currency_symbol}${activity?.reward_money} for performing a task on ${UseCapitalise(activity?.platform)}`}
                    {activity?.status === "in_review" &&
                      `Performed a ${activity?.task?.goal || activity?.task?.task_type} task on ${activity?.platform}`}
                    {activity?.status === "cancelled" &&
                      `Performed a ${activity?.task?.goal || activity?.task?.task_type} task on ${UseCapitalise(activity?.platform)}`}
                  </span>
                </div>
              </div>
              <div className="text-secondary text-[12px]">
                {format(
                  new Date(activity?.date_completed || activity?.started_at),
                  "yyyy-MM-dd,HH-mm a",
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {details?.task_activity?.activities?.length === 0 && (
        <div className="flex w-full items-center justify-center">
          No Activities
        </div>
      )}
    </div>
  );
};
export default UserActivities;
