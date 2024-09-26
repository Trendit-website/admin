import Icons from "../../Shared/Icons";
import { UseGetOutflowPayment } from "../../../api/useGetTransaction";
import { UseCapitalise } from "../../../utils/useCapitalise";
const EarnerPayoutTable = () => {
  const { outflowPayment, isLoadingOutFlow, isErrorOutflow } =
    UseGetOutflowPayment();
  return (
    <>
      {isLoadingOutFlow && !isErrorOutflow && (
        <div className="w-full flex h-screen py-8 justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isErrorOutflow && (
        <div className="w-full h-screen text-red-500 h-screen py-8 flex justify-center">
          {isErrorOutflow?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {outflowPayment && (
        <table className="w-full flex flex-col">
          <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center">
              <td className="w-3/12">Payment type</td>
              <td className="w-6/12">Payment method</td>
              <td className="w-3/12">Transaction Ref</td>
              <td className="w-3/12">Status</td>
              <td className="w-3/12">Amount</td>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
            {outflowPayment?.transactions?.map(
              (transaction: any, index: number) => (
                <tr
                  key={index}
                  className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                >
                  <td className="w-3/12">
                    {UseCapitalise(transaction?.payment_type)}
                  </td>
                  <td className="w-6/12">
                    {UseCapitalise(transaction?.payment_method)}
                  </td>
                  <td className="w-3/12">{transaction?.key}</td>
                  <td className="w-3/12">
                    <div className="flex items-center justify-center gap-x-[4px] text-[#067647] text-[12px] w-[92px] h-[22px] rounded-[16px] border-solid border-[1px] border-[#ABEFC6]">
                      <Icons type="verified-icon" />
                      {UseCapitalise(transaction?.status)}
                    </div>
                  </td>
                  <td className="w-3/12 text-[#4CAF50]">
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
export default EarnerPayoutTable;
