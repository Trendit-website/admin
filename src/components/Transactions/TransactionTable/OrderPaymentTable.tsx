import Icons from "../../Shared/Icons";
import { UseGetInflowPayment } from "../../../api/useGetTransaction";
import { UseCapitalise } from "../../../utils/useCapitalise";
import { useState } from "react";
import { format } from "date-fns";
const OrderPaymentTable = () => {
  const [activePage, setActivePage] = useState(1);
  const { inflowPayment, isLoadingInflowPayment, isErrorInflowPayment } =
    UseGetInflowPayment(activePage);
  const NextPage = () => {
    if (inflowPayment?.pages) {
      activePage !== inflowPayment?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (inflowPayment?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  return (
    <>
      {isLoadingInflowPayment && !isErrorInflowPayment && (
        <div className="w-full h-screen flex py-8 justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isErrorInflowPayment && (
        <div className="w-full h-screen text-red-500 h-screen py-8 flex justify-center">
          {isErrorInflowPayment?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {inflowPayment && (
        <>
          <table className="w-full flex flex-col">
            <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
              <tr className="flex items-center">
                <td className="w-3/12">Payment type</td>
                <td className="w-3/12">Payment method</td>
                <td className="w-3/12">Transaction Ref</td>
                <td className="w-3/12">Status</td>
                <td className="w-3/12">Amount</td>
                <td className="w-2/12">Created time</td>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
              {inflowPayment?.transactions?.map(
                (transaction: any, index: number) => (
                  <tr
                    key={index}
                    className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                  >
                    <td className="w-3/12">
                      {UseCapitalise(transaction?.payment_type)}
                    </td>
                    <td className="w-3/12">
                      {UseCapitalise(transaction?.payment_method)}
                    </td>
                    <td className="w-3/12">{transaction?.key}</td>
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
                    <td className="w-3/12 text-[#4CAF50]">
                      {transaction?.amount}
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
            </tbody>
          </table>
          <div className="flex w-full items-center justify-between px-4 py-6">
            <div className="flex items-center cursor-pointer gap-x-4">
              <p className="">
                {activePage} of {inflowPayment.pages}
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <div
                onClick={() => PrevPage()}
                className="flex items-center cursor-pointer gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
              >
                <Icons type="prev" />
                Previous
              </div>
              <div
                onClick={() => NextPage()}
                className="flex items-center gap-x-[6px] cursor-pointer px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
              >
                Next
                <Icons type="next" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default OrderPaymentTable;
