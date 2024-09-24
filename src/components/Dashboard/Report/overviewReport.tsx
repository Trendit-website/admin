import Button from "@/components/Shared/Button";
import Icons from "@/components/Shared/Icons";
import { UseGetOverviewReport } from "@/api/useGetDashboardInsight";
import UseFormatNumbers from "@/utils/useFormatNumber";
import { useState } from "react";

const OverviewReport = () => {
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
  const { overviewReport, isLoading, isError } = UseGetOverviewReport(
    activeRange.query,
  );
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
      <div className="ml-4 w-6/12 flex items-center gap-x-4 border-b-[1px] border-solid border-[#E4E7EC]">
        {Range.map((range, index) => (
          <p
            key={index}
            className={`pb-2 ${activeRange.label === range.label ? "text-main cursor-pointer border-b-[1px] border-solid border-main" : "text-seondary"}`}
            onClick={() => setActiveRange(range)}
          >
            {range.label}
          </p>
        ))}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Icons type="loader" />
        </div>
      )}
      {isError && (
        <div className="text-primary-black w-full text-center">
          An Error Occured try again later !!!
        </div>
      )}
      <div className="w-11/12 px-4 grid grid-cols-4 gap-8">
        {overviewReport && (
          <>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">
                Total Earners Settled
              </p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(
                    Number(overviewReport?.total_earners_settled),
                  )}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">Total Order Paid</p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(Number(overviewReport?.total_order_paid))}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">Total Referral paid</p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(
                    Number(overviewReport?.total_referral_paid),
                  )}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">Total Membership Fee</p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(
                    Number(overviewReport?.total_membership_fee),
                  )}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">Total Inflow Pending</p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(
                    Number(overviewReport?.total_inflow_pending),
                  )}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">
                Total Outflow Pending
              </p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(
                    Number(overviewReport?.total_outflow_pending),
                  )}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">
                No of Available Tasks
              </p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(
                    Number(overviewReport?.num_available_tasks),
                  )}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] text-[#475467]">No of Approved Ads</p>
              <div className="flex items-center gap-x-2">
                <span className="text-primary-black text-[30px]">
                  {UseFormatNumbers(Number(overviewReport?.num_approved_ads))}
                </span>
                {/* <div className="flex items-center gap-x-[4px] px-[3px] text-[14px] border-solid border-[1px] rounded-[6px] border-[#E4E7EC]">
                          <Icons type="chart" />
                          {}%
                        </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default OverviewReport;
