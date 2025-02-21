import { useState } from "react";
import Icons from "../Shared/Icons";
import AllTransactionTable from "./TransactionTable/AllTransaction";
import EarnerPayoutTable from "./TransactionTable/EarnerPayoutTable";
import OrderPaymentTable from "./TransactionTable/OrderPaymentTable";
import WithdrawalModal from "./PaymentModal/WithdrawalModal";
import { useDisclosure } from "@nextui-org/react";
import { UseGetAllTransaction } from "../../api/useGetTransaction";
import UseFormatNumbers from "../../utils/useFormatNumber";
import WithdrawRequestTable from "./TransactionTable/WithdrawRequestTable";
import { useRouter, useSearchParams } from "next/navigation";
const Transaction = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [activePage, setActivePage] = useState(1);
  const router = useRouter()
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
  const Tabs = [
    "All Transactions",
    "Earner Payout",
    "Order Payment",
    "Payment Request",
  ];
  const [activeTab, setActiveTab] = useState(currentTab || Tabs[0]);
  const [isPopUp, setPopUp] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showModal = () => {
    onOpen();
  };
  const { allTransaction, isLoadingTransaction, isErrorTransaction } =
    UseGetAllTransaction(activePage);
  return (
    <>
      <div className="w-full flex items-start py-8">
        <div className="flex flex-col m-auto text-primary-black gap-y-8 py-6 w-10/12">
          <div className="flex items-center justify-between w-full m-auto">
            <h1 className="flex flex-col text-[30px] font-bold">
              Transactions
              <span className="text-[#667185] text-[14px] font-normal">
                Check and filter all transactions here
              </span>
            </h1>
            {/* <div className="flex items-center justify-around bg-main text-[#FFFFFF] w-[117px] h-[36px] py-[2px] px-[6px] rounded-[6px]">
              Create
              <Icons type="plus" />
            </div> */}
          </div>

          <div className="bg-[#FFFFFF] flex flex-col gap-y-6 w-full px-6 rounded-[6px] border-solid border-[1px] border-borderColor">
            <div className="flex items-center gap-x-8 py-2">
              <div className="flex flex-col">
                <p className="text-[15px]">Wallet bal:</p>
                <div className="text-[32px]">
                  #3,326.<span className="text-[#B1B1B1]">09</span>
                </div>
                <span className="text-[12px] text-[#667085]">
                  Available for payouts
                </span>
              </div>
              {/* <div
                onClick={() => setPopUp(!isPopUp)}
                className="flex items-center justify-center rounded-[125px] w-[35px] h-[35px] border-[1px] border-solid border-[#DADADA]"
              >
                <Icons type="horizontal-dot" />
              </div> */}
            </div>
            {isPopUp && (
              <div className="flex flex-col px-2 py-2 ml-48 -mt-14 -mb-32 z-10 bg-[#FFFFFF] shadow-2xl w-[301px] h-[172px] rounded-[12px]">
                <div
                  onClick={() => showModal()}
                  className="flex items-start w-full px-2 py-4 gap-x-2"
                >
                  <span className="bg-[#FFD0FE91] flex items-center justify-center px-[2px] py-[2px]">
                    <Icons type="withdraw-arrow" />
                  </span>
                  <div className="flex flex-col gap-y-[2px]">
                    <p className="text-[16px]">Withdraw Funds</p>
                    <span className="text-secondary text-[12px]">
                      Send to your default bank account
                    </span>
                  </div>
                </div>
                <div className="flex items-start w-full px-2 py-4 gap-x-2">
                  <span className="bg-[#FFD0FE91] flex items-center justify-center px-[2px] py-[2px]">
                    <Icons type="plus" fill="#CB29BE" />
                  </span>
                  <div className="flex flex-col gap-y-[2px]">
                    <p className="text-[16px]">Withdraw Funds</p>
                    <span className="text-secondary text-[12px]">
                      Send to your default bank account
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex items-center justify-start gap-x-32">
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] text-[#475467]">Total Inflow</p>
                <div className="flex items-center gap-x-2">
                  <span className="text-primary-black text-[30px]">
                    {UseFormatNumbers(Number(allTransaction?.total_inflow))}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] text-[#475467]">Total Outflow</p>
                <div className="flex items-center gap-x-2">
                  <span className="text-primary-black text-[30px]">
                    {UseFormatNumbers(Number(allTransaction?.total_outflow))}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] text-[#475467]">
                  Total Inflow Pending
                </p>
                <div className="flex items-center gap-x-2">
                  <span className="text-primary-black text-[30px]">
                    {UseFormatNumbers(
                      Number(allTransaction?.total_pending_inflow),
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] text-[#475467]">
                  Total Outflow Pending
                </p>
                <div className="flex items-center gap-x-2">
                  <span className="text-primary-black text-[30px]">
                    {UseFormatNumbers(
                      Number(allTransaction?.total_pending_outflow),
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="">Recent transactions</div>
            <div className="flex items-center w-full gap-x-12 border-b-[1px] border-solid border-borderColor">
              {Tabs.map((tab, index) => (
                <p
                  onClick={() => (setActiveTab(tab),router.push(`/transactions?tab=${tab}`))}
                  key={index}
                  className={`text-[14px] cursor-pointer pb-2 ${activeTab === tab ? "text-main cursor-pointer border-solid border-b-[1px] border-main" : "text-[#344054]"} `}
                >
                  {tab}
                </p>
              ))}
            </div>
            {activeTab === Tabs[0] && <AllTransactionTable tab={activeTab}/>}
            {activeTab === Tabs[1] && <EarnerPayoutTable tab={activeTab}/>}
            {activeTab === Tabs[2] && <OrderPaymentTable tab={activeTab}/>}
            {activeTab === Tabs[3] && <WithdrawRequestTable tab={activeTab} />}
          </div>
        </div>
      </div>
      {/* <WithdrawalModal isOpen={isOpen} onClose={onClose} /> */}
    </>
  );
};
export default Transaction;
