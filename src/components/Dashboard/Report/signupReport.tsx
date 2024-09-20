import Button from "@/components/Shared/Button";
import Image from "next/image";
import { UseGetSignupReport } from "@/api/useGetDashboardInsight";
import { useState } from "react";
import LineChart from "./signupChart";
const SignupReport = () => {
  const Range = [
    {
      label: "12 months",
      query: "year",
    },
    {
      label: "30 days",
      query: "month",
    },
    {
      label: "7 days",
      query: "week",
    },
    {
      label: "24 hours",
      query: "day",
    },
  ];
  const [activeRange, setActiveRange] = useState(Range[0]);
  const { signupReport, isLoading, isError } = UseGetSignupReport(
    activeRange.query,
  );
  return (
    <div className="w-full h-[680px] bg-[#FFFFFF] border-[1px] border-[#E4E7EC] border-solid  flex flex-col py-4 gap-y-10 text-primary-black rounded-[12px]">
      <div className="flex items-center justify-between w-11/12 px-4 ">
        <p className="text-[18px] font-bold text-primary-black">
          Signup report
        </p>
        <Button
          classNames="flex items-center justify-center py-2 px-6 border-[1px] border-[#D0D5DD] border-solid rounded-[8px]"
          label="View report"
        />
      </div>
      <div className="ml-4 w-6/12 flex items-center gap-x-4 border-b-[1px] border-solid border-[#E4E7EC]">
        {Range.map((range, index) => (
          <p
            key={index}
            className={`pb-2 ${activeRange.label === range.label ? "text-main border-b-[1px] border-solid border-main" : "text-seondary"}`}
            onClick={() => setActiveRange(range)}
          >
            {range.label}
          </p>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <LineChart signupReport={signupReport} range={activeRange?.label} />
        {/* <Image src="/assets/chart.png" alt="" width={802} height={192} /> */}
      </div>
    </div>
  );
};
export default SignupReport;
