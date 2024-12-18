import { UserDetailsSchema } from "../../../../utils/schema/userSchema";
const UsersDeatailsInsight = ({
  activeTab,
  details,
}: {
  activeTab: string;
  details: UserDetailsSchema | undefined;
}) => {
  const ReportOverview = [
    {
      label: "Total Earned This Month",
      value: details?.transaction_metrics.total_earned_current_month,
      percentage: "7.4",
    },
    {
      label: "Overall Earnings",
      value: details?.transaction_metrics.total_earned_overall,
      percentage: "7.2",
    },
    {
      label: "Total Spent This Month",
      value: details?.transaction_metrics.total_spent_current_month,
      percentage: "0.2",
    },
    {
      label: "Overall Spending",
      value: details?.transaction_metrics.total_spent_overall,
      percentage: "10.8",
    },
    {
      label: "Total Transactions",
      value: details?.transaction_metrics.total_transactions,
      percentage: "10.8",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between w-11/12 px-4 ">
        <p className="text-[18px] cursor-pointer font-bold text-primary-black">
          {activeTab}
        </p>
      </div>
      <div className="w-full px-2 grid grid-cols-4 gap-8">
        {ReportOverview.map((report, index) => (
          <div key={index} className="flex flex-col gap-[4px]">
            <p className="text-[14px] text-[#475467]">{report.label}</p>
            <div className="flex items-center gap-x-2">
              <span className="text-primary-black text-[30px]">
                #{Number(report.value).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default UsersDeatailsInsight;
