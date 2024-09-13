import Button from "@/components/Shared/Button";
import Icons from "@/components/Shared/Icons";
import { useGetDashboardInsight } from "@/api/useGetDashboardInsight";
import { useEffect } from "react";

const OverviewReport = () => {
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
  const {dashboardInsight, isLoading, isError } = useGetDashboardInsight('year')
  console.log(dashboardInsight)
  return (
    <div className="w-full h-[411px] bg-[#FFFFFF] border-[1px] border-[#E4E7EC] border-solid  flex flex-col py-4 gap-y-10 text-primary-black rounded-[12px]">
      <div className="flex items-center justify-between w-11/12 px-4 ">
        <p className="text-[18px] font-bold text-primary-black">
          Overview report
        </p>
        <Button
          classNames="flex items-center justify-center py-2 px-6 border-[1px] border-[#D0D5DD] border-solid rounded-[8px]"
          label="View report"
        />
      </div>
      <div className="ml-4 w-[290px] flex items-center gap-x-4 pb-2 border-b-[1px] border-solid border-[#E4E7EC]">
        {Range.map((range, index) => (
          <p key={index}>{range}</p>
        ))}
      </div>
      <div className="w-11/12 px-4 grid grid-cols-4 gap-8">
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
    </div>
  );
};
export default OverviewReport;
