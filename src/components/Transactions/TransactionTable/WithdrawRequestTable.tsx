import { format } from "date-fns";
import { UseGetPaymentRequest } from "../../../api/useGetTransaction";
import { UseCapitalise } from "../../../utils/useCapitalise";
import Icons from "../../Shared/Icons";
import { useState } from "react";
const WithdrawRequestTable = () => {
  const [activePage, setActivePage] = useState(1);
  const { paymentRequest, isLoadingRequest, isError } =
    UseGetPaymentRequest(activePage);
  console.log(paymentRequest)
  const pages = Array.from(
    { length: paymentRequest?.pages ?? 1 },
    (_, i) => i + 1,
  );
  const NextPage = () => {
    if (paymentRequest?.pages) {
      activePage !== paymentRequest?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (paymentRequest?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  const showSpecificPage = (page: number) => {
    setActivePage(page);
  };
  return (
    <>
      {isLoadingRequest && !isError && (
        <div className="w-full h-full flex py-8 justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isError && (
        <div className="w-full h-screen text-red-500 h-screen text-red-500 py-6 flex justify-center">
          {isError?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {paymentRequest?.withdrawal_requests?.length < 1 && (
        <div className="w-full flex items-center justify-center py-10">
          No withdrawal requests at the moment
        </div>
      )}
      {paymentRequest?.withdrawal_requests?.length > 0 && (
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
              {paymentRequest?.withdrawal_requests?.map(
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
                      <div className={`flex items-center justify-center gap-x-[4px] text-[#067647] text-[12px] w-[92px] h-[22px] rounded-[16px] border-solid border-[1px] border-[#ABEFC6] ${transaction?.status === "complete" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "success" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "pending" && "text-[#F79009] border-[#F79009]" } ${transaction?.status === "FAILED" && "text-[#F04438] border-[#F04438]"}`}>
                      {
                          transaction?.status === 'complete' && (
                            <Icons type="verified-icon" />
                          )
                        }
                         {
                          transaction?.status === 'success' && (
                            <Icons type="verified-icon" />
                          )
                        }
                        {
                          transaction?.status === 'pending' && (
                            <Icons type="pending-icon" />
                          )
                        }
                        {
                          transaction?.status === 'FAILED' && (
                            <Icons type="rejected-icon" />
                          )
                        }
                        {UseCapitalise(transaction?.status)}
                      </div>
                    </td>
                    <td className="w-3/12">
                      {transaction?.amount}
                    </td>
                    <td className="w-2/12 text-[#000000]">
                      {format( new Date(transaction?.created_at), "MMM-dd-yyyy, HH:mma")}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <div className="w-full flex items-center justify-between py-4 px-4">
            <div
              onClick={() => PrevPage()}
              className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              <Icons type="prev" />
              Previous
            </div>
            <div className="flex items-center gap-x-4">
              {pages.map((item, index) => (
                <p
                  className={
                    activePage === item
                      ? "text-main h-[20px] w-[20px] rounded-[8px] flex items-center justify-center font-bold border-[1px] border-solid border-main"
                      : ""
                  }
                  onClick={() => showSpecificPage(item)}
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
            <div
              onClick={() => NextPage()}
              className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
            >
              Next
              <Icons type="next" />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default WithdrawRequestTable;
