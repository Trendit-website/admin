import Icons from "../../Shared/Icons";
import { UseCapitalise } from "../../../utils/useCapitalise";
const AllTransactionTable = ({
  allTransactions,
  isLoadingTransaction,
  isTransactionError,
}: {
  allTransactions: any;
  isLoadingTransaction: boolean;
  isTransactionError: any;
}) => {
  return (
    <>
      {isLoadingTransaction && (
        <div className="w-full flex items-center py-8 justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isTransactionError && <div>An error occured please try again later</div>}
      {allTransactions && (
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
      )}
    </>
  );
};
export default AllTransactionTable;
