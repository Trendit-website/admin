import Icons from "../../Shared/Icons";
import { UseCapitalise } from "../../../utils/useCapitalise";
import { useState } from "react";
const AllTransactionTable = ({
  allTransactions,
  isLoadingTransaction,
  isTransactionError,
}: {
  allTransactions: any;
  isLoadingTransaction: boolean;
  isTransactionError: any;
}) => {
  const [activePage, setActivePage] = useState(1);
  const pages = Array.from(
    { length: allTransactions?.pages ?? 1 },
    (_, i) => i + 1,
  );
  const NextPage = () => {
    if (allTransactions?.pages) {
      activePage !== allTransactions?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (allTransactions?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  const showSpecificPage = (page: number) => {
    setActivePage(page);
  };
  return (
    <>
      {isLoadingTransaction && !isTransactionError && (
        <div className="w-full h-full flex py-8 justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isTransactionError && (
        <div className="w-full h-screen text-red-500 h-screen text-red-500 py-6 flex justify-center">
          {isTransactionError?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {allTransactions && (
        <>
          <table className="w-full flex flex-col">
            <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
              <tr className="flex items-center">
                <td className="w-1/12">Type</td>
                <td className="w-7/12">Description</td>
                <td className="w-2/12">Transaction Ref</td>
                <td className="w-2/12 ml-8">Category</td>
                <td className="w-2/12">Status</td>
                <td className="w-2/12">Amount</td>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
              {allTransactions?.transactions?.map(
                (transaction: any, index: number) => (
                  <tr
                    key={index}
                    className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                  >
                    <td className="w-1/12">
                      {UseCapitalise(transaction?.transaction_type)}
                    </td>
                    <td className="w-7/12">
                      {UseCapitalise(transaction?.description)}
                    </td>
                    <td className="w-2/12">{transaction?.key}</td>
                    <td className="w-2/12 ml-8">
                      {UseCapitalise(transaction?.transaction_type)}
                    </td>
                    <td className="w-2/12">
                      <div className="flex items-center justify-center gap-x-[4px] text-[#067647] text-[12px] w-[92px] h-[22px] rounded-[16px] border-solid border-[1px] border-[#ABEFC6]">
                        <Icons type="verified-icon" />
                        {UseCapitalise(transaction?.status)}
                      </div>
                    </td>
                    <td className="w-2/12 text-[#4CAF50]">
                      {transaction?.amount}
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
export default AllTransactionTable;
