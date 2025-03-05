import Icons from "../../Shared/Icons";
import { UseGetOutflowPayment } from "../../../api/useGetTransaction";
import { UseCapitalise } from "../../../utils/useCapitalise";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
const EarnerPayoutTable = ({tab}: {tab: string}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [activePage, setActivePage] = useState(currentPage || 1);
  const router = useRouter()
  const { outflowPayment, isLoadingOutFlow, isErrorOutflow } =
    UseGetOutflowPayment(activePage);
  const NextPage = () => {
    if (outflowPayment?.pages) {
      activePage !== outflowPayment?.pages
        ? (setActivePage((prevPage) => prevPage + 1), router.push(`/transactions?tab=${tab}&page=${activePage + 1}`))
        : "";
    }
  };
  const PrevPage = () => {
    if (outflowPayment?.pages) {
      activePage === 1 ? "" : (setActivePage((prevPage) => prevPage - 1), router.push(`/transactions?tab=${tab}&page=${activePage - 1}`))
    }
  };
  return (
    <>
      <>
        <table className="w-full flex flex-col">
          <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center">
              <td className="w-3/12">Account Number</td>
              <td className="w-4/12">Bank Name</td>
              <td className="w-3/12">Transaction Ref</td>
              <td className="w-3/12">Status</td>
              <td className="w-3/12">Amount</td>
              <td className="w-2/12">Created time</td>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
            {outflowPayment &&
              outflowPayment.total > 0 &&
              outflowPayment?.transactions?.map(
                (transaction: any, index: number) => (
                  <tr
                    key={index}
                    className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                  >
                    <td className="w-3/12">
                      {UseCapitalise(transaction?.account_no)}
                    </td>
                    <td className="w-4/12">
                      {UseCapitalise(transaction?.bank_name)}
                    </td>
                    <td className="w-3/12">{transaction?.reference}</td>
                    <td className="w-3/12">
                      <div
                        className={`flex items-center justify-center gap-x-[4px] text-[#067647] text-[12px] w-[92px] h-[22px] rounded-[16px] border-solid border-[1px] border-[#ABEFC6] ${transaction?.status === "complete" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "success" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "pending" && "text-[#F79009] border-[#F79009]"} ${transaction?.status === "FAILED" && "text-[#F04438] border-[#F04438]"}`}
                      >
                        {transaction?.status === "complete" && (
                          <Icons type="verified-icon" />
                        )}
                        {transaction?.status === "success" && (
                          <Icons type="verified-icon" />
                        )}
                        {transaction?.status === "pending" && (
                          <Icons type="pending-icon" />
                        )}
                        {transaction?.status === "FAILED" && (
                          <Icons type="rejected-icon" />
                        )}
                        {UseCapitalise(transaction?.status)}
                      </div>
                    </td>
                    <td className="w-3/12">
                      ₦{Number(transaction?.amount).toLocaleString()}.00
                    </td>
                    <td className="w-2/12 text-[#000000]">
                      {format(
                        new Date(transaction?.created_at),
                        "MMM-dd-yyyy, HH:mma",
                      )}
                    </td>
                  </tr>
                ),
              )}
            {isErrorOutflow && (
              <div className="w-full h-screen text-red-500 h-screen py-8 flex justify-center">
                {isErrorOutflow?.response?.data?.message ||
                  " An error occured try again later"}
              </div>
            )}
            {isLoadingOutFlow && !isErrorOutflow && (
              <div className="w-full flex h-screen py-8 justify-center">
                <Icons type="loader" />
              </div>
            )}
          </tbody>
        </table>
        <div className="flex w-full items-center justify-between px-4 py-6">
          <div className="flex items-center cursor-pointer gap-x-4">
            <p className="text-main">
              {activePage} of{" "}
              {outflowPayment ? outflowPayment.pages : activePage}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              disabled={activePage === 1}
              onClick={() => PrevPage()}
              className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              <Icons type="prev" />
              Previous
            </button>
            <button
              disabled={
                activePage === outflowPayment?.pages ||
                outflowPayment?.total === 0
              }
              onClick={() => NextPage()}
              className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              Next
              <Icons type="next" />
            </button>
          </div>
        </div>
      </>
    </>
  );
};
export default EarnerPayoutTable;
