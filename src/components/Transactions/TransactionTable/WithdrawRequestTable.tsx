import { format } from "date-fns";
import {
  UseEvaluateWithdrawal,
  UseGetPaymentRequest,
} from "../../../api/useGetTransaction";
import { UseCapitalise } from "../../../utils/useCapitalise";
import Icons from "../../Shared/Icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
const WithdrawRequestTable = ({tab}: {tab: string}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [activePage, setActivePage] = useState(currentPage || 1);
  const router = useRouter()
  const [loading, setLoading] = useState({ id: 0, state: false });
  const { paymentRequest, isLoadingRequest, isError } =
    UseGetPaymentRequest(activePage);
  const NextPage = () => {
    if (paymentRequest?.pages) {
      activePage !== paymentRequest?.pages
        ? (setActivePage((prevPage) => prevPage + 1), router.push(`/transactions?tab=${tab}&page=${activePage + 1}`))
        : "";
    }
  };
  const verifyRequest = (id: number, action: string) => {
    setLoading({ id: id, state: true });
    UseEvaluateWithdrawal({ withdrawal_request_id: id, status: action }, activePage)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading({ id: 0, state: false });
      });
  };
  const PrevPage = () => {
    if (paymentRequest?.pages) {
      activePage === 1 ? "" : (setActivePage((prevPage) => prevPage - 1), router.push(`/transactions?tab=${tab}&page=${activePage - 1}`))
    }
  };
  return (
    <>
      <>
        <table className="w-full flex flex-col">
          <thead className="w-full bg-[#F5F5F5] py-2 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center">
              <td className="w-2/12">Account Number</td>
              <td className="w-2/12">Bank Name</td>
              <td className="w-3/12">Transaction Ref</td>
              <td className="w-2/12">Status</td>
              <td className="w-2/12">Amount</td>
              <td className="w-2/12">Created time</td>
              <td className="w-1/12">Action</td>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 text-secondary text-[12px]">
            {paymentRequest &&
              paymentRequest?.withdrawal_requests?.length > 0 && (
                  paymentRequest?.withdrawal_requests?.map(
                    (transaction: any, index: number) => (
                      <tr
                        key={index}
                        className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                      >
                        <td className="w-2/12">
                          {transaction?.account_no}
                        </td>
                        <td className="w-2/12">
                          {UseCapitalise(transaction?.bank_name)}
                        </td>
                        <td className="w-3/12">
                        {transaction?.reference}
                        </td>
                        <td className="w-2/12">
                          <div
                            className={`flex items-center justify-center gap-x-[4px] text-[#067647] text-[12px] w-[92px] h-[22px] rounded-[16px] border-solid border-[1px] border-[#ABEFC6]
                              ${transaction?.status === "complete" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "success" && "text-[#067647] border-[#ABEFC6]"} ${transaction?.status === "pending" && "text-[#F79009] border-[#F79009]"} ${transaction?.status === "FAILED" && "text-[#F04438] border-[#F04438]"}
                              `}
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
                        <td className="w-2/12">
                          ₦{Number(transaction?.amount).toLocaleString()}.00
                        </td>
                        <td className="text-[#000000] w-2/12">
                          {format(
                            new Date(transaction?.created_at),
                            "MMM-dd-yyyy, HH:mma",
                          )}
                        </td>
                        <td className="flex justify-center w-1/12">
                          {loading.id === transaction.id && loading.state ? (
                            <Icons type="loader" />
                          ) : (
                            <div className="flex items-center gap-x-2">
                              <button
                                onClick={() =>
                                  verifyRequest(transaction.id, "reject")
                                }
                              >
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  verifyRequest(transaction.id, "accept")
                                }
                                className="text-main"
                              >
                                Approve
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                     )
                  )
              )} 
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
          </tbody>
        </table>
        <div className="flex w-full items-center justify-between px-4 py-4">
          <div className="flex items-center gap-x-4">
            <p
              className={"text-main flex items-center justify-center font-bold"}
            >
              {activePage} of{" "}
              {paymentRequest && paymentRequest.pages > 0
                ? paymentRequest.pages
                : activePage}
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
                activePage === paymentRequest?.pages ||
                paymentRequest?.pages === 0
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
export default WithdrawRequestTable;