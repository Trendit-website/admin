import { useState } from "react";
import Icons from "../Shared/Icons";
import AllTransactionTable from "./TransactionTable/AllTransaction";
import EarnerPayoutTable from "./TransactionTable/EarnerPayoutTable";
import OrderPaymentTable from "./TransactionTable/OrderPaymentTable";
const Transaction = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
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
  ];
  const Tabs = ["All Transactions", "Earner Payout", "Order Payment"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  return (
    <div className="w-full flex items-start py-8">
      <div className="flex flex-col m-auto text-primary-black gap-y-8 py-6 w-10/12">
        <div className="flex items-center justify-between w-full m-auto">
          <h1 className="flex flex-col text-[30px] font-bold">
            Transactions
            <span className="text-[#667185] text-[14px]">
              Check and filter all your medical appointments here
            </span>
          </h1>
          <div className="flex items-center justify-around bg-main text-[#FFFFFF] w-[117px] h-[36px] py-[2px] px-[6px] rounded-[6px]">
            Create
            <Icons type="plus" />
          </div>
        </div>
        <div className="bg-[#FFFFFF] flex flex-col w-full py-6 gap-y-8 px-6 rounded-[6px] border-solid border-[1px] border-borderColor">
          <div className="flex items-center gap-x-4 py-4">
            <div className="flex flex-col">
              <p className="text-[15px]">Wallet bal:</p>
              <div className="text-[32px]">
                #3,326.<span className="text-[#B1B1B1]">09</span>
              </div>
              <span className="text-[12px] text-[#667085]">
                Available for payouts
              </span>
            </div>
            <div className="flex items-center justify-center rounded-[125px] w-[35px] h-[35px] border-[1px] border-solid border-[#DADADA]">
              <Icons type="horizontal-dot" />
            </div>
          </div>
          <div>
            <div className="w-full flex items-center justify-between">
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
          <div>Recent transactions</div>
          <div className="flex items-center w-full gap-x-12 border-b-[1px] border-solid border-borderColor">
            {Tabs.map((tab, index) => (
              <p
                onClick={() => setActiveTab(tab)}
                key={index}
                className={`text-[14px] pb-2 ${activeTab === tab ? "text-main border-solid border-b-[1px] border-main" : "text-[#344054]"} `}
              >
                {tab}
              </p>
            ))}
          </div>
          {activeTab === Tabs[0] && <AllTransactionTable />}
          {activeTab === Tabs[1] && <EarnerPayoutTable />}
          {activeTab === Tabs[2] && <OrderPaymentTable />}
          <div className="w-full flex items-center justify-between py-4 px-4">
            <div className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
              <Icons type="prev" />
              Previous
            </div>
            <div className="flex items-center gap-x-4">
              {pages.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
            <div className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
              Next
              <Icons type="next" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Transaction;
