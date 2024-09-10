import Icons from "@/components/Shared/Icons";
import Button from "@/components/Shared/Button";
const UsersDeatailsInsight = ({ activeTab }: { activeTab: string }) => {
  const Range = ["12 months", "30 days", "7 days", "24 hours"];
  const ReportOverview = [
    {
      label: "Total Earners Settled",
      value: "845.8k",
      percentage: "7.4",
    },
    {
      label: "Total Order Paid",
      value: "20.2M",
      percentage: "7.2",
    },
    {
      label: "Total Referral paid",
      value: "10.2k",
      percentage: "0.2",
    },
    {
      label: "Total Membership Fee",
      value: "400.3k",
      percentage: "10.8",
    },
    {
      label: "Total Inflow Pending",
      value: "2.3k",
      percentage: "10.8",
    },
    {
      label: "Total Outflow Pending",
      value: "10.2",
      percentage: "10.8",
    },
    {
      label: "No. of Available Tasks",
      value: "887",
      percentage: "7.2%",
    },
    {
      label: "No of Approved Ads",
      value: "780",
      percentage: "0.2",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between w-11/12 px-4 ">
        <p className="text-[18px] font-bold text-primary-black">{activeTab}</p>
      </div>
      <div className="w-full px-2 grid grid-cols-4 gap-8">
        {ReportOverview.map((report, index) => (
          <div key={index} className="flex flex-col gap-[4px]">
            <p className="text-[14px] text-[#475467]">{report.label}</p>
            <div className="flex items-center gap-x-2">
              <span className="text-primary-black text-[30px]">
                #{report.value}
              </span>
              <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                <Icons type="chart" />
                {report.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default UsersDeatailsInsight;
