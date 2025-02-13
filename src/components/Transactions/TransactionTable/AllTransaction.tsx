import Icons from "../../Shared/Icons";
import { UseCapitalise } from "../../../utils/useCapitalise";
import { useState } from "react";
import {
  UseGetAllTransaction,
  UseGetBalance,
} from "../../../api/useGetTransaction";
import { format } from "date-fns";
const AllTransactionTable = () => {
  const [activePage, setActivePage] = useState(1);
  const { allTransaction, isLoadingTransaction, isErrorTransaction } =
    UseGetAllTransaction(activePage);
  // const { balance, balanceError} = UseGetBalance()
  // console.log(allTransaction);
  // console.log(balance, balanceError)
  const NextPage = () => {
    if (allTransaction?.pages) {
      activePage !== allTransaction?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (allTransaction?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 bg-white">
      <>
        <table className="w-full flex flex-col">
          <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center">
              <td className="w-2/12">Type</td>
              <td className="w-6/12">Description</td>
              <td className="w-2/12">Transaction Ref</td>
              <td className="w-2/12 ml-8">Category</td>
              <td className="w-2/12">Status</td>
              <td className="w-2/12">Amount</td>
              <td className="w-2/12">Created time</td>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
            {allTransaction &&
              allTransaction.transactions.length > 0 &&
              allTransaction?.transactions?.map(
                (transaction: any, index: number) => (
                  <tr
                    key={index}
                    className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                  >
                    <td className="w-2/12">
                      {UseCapitalise(transaction?.transaction_type)}
                    </td>
                    <td className="w-6/12">
                      {UseCapitalise(transaction?.description)}
                    </td>
                    <td className="w-2/12">{transaction?.key}</td>
                    <td
                      className={`w-2/12 ml-8 ${transaction?.transaction_type === "debit" && "text-red-500"} ${transaction?.transaction_type === "payment" && "text-[#067647]"}`}
                    >
                      {UseCapitalise(transaction?.transaction_type)}
                    </td>
                    <td className="w-2/12">
                      <div
                        className={`flex items-center justify-center gap-x-[4px] text-[12px] w-[92px] h-[22px] rounded-[16px] border-solid border-[1px] ${transaction?.status === "complete" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "success" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "pending" && "text-[#F79009] border-[#F79009]"} ${transaction?.status === "failed" && "text-[#F04438] border-[#F04438]"}`}
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
                        {transaction?.status === "failed" && (
                          <Icons type="rejected-icon" />
                        )}
                        {UseCapitalise(transaction?.status)}
                      </div>
                    </td>
                    <td className={`w-2/12`}>₦{transaction?.amount}</td>
                    <td className="w-2/12 text-[#000000]">
                      {format(
                        new Date(transaction?.created_at),
                        "MMM-dd-yyyy, HH:mma",
                      )}
                    </td>
                  </tr>
                ),
              )}
            {isErrorTransaction && (
              <div className="w-full h-screen text-red-500 h-screen text-red-500 py-6 flex justify-center">
                {isErrorTransaction?.response?.data?.message ||
                  " An error occured try again later"}
              </div>
            )}
            {isLoadingTransaction && !isErrorTransaction && (
              <div className="w-full h-screen flex py-8 justify-center">
                <Icons type="loader" />
              </div>
            )}
          </tbody>
        </table>
      </>
      <div className="flex w-full items-center justify-between px-4 pb-4">
        <div className="flex items-center cursor-pointer gap-x-4">
          <p className="">
            {activePage} of{" "}
            {allTransaction ? allTransaction?.pages : activePage}
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
              activePage === allTransaction?.pages ||
              allTransaction?.total === 0
            }
            onClick={() => NextPage()}
            className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
          >
            Next
            <Icons type="next" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AllTransactionTable;
