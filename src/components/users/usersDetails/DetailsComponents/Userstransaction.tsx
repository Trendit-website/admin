import Icons from "@/components/Shared/Icons";
import { UseCapitalise } from "@/utils/useCapitalise";
import { UserDetailsSchema } from "@/utils/userSchema";
import { format } from "date-fns";
const Userstransaction = ({
  details,
}: {
  details: UserDetailsSchema | undefined;
}) => {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex items-center gap-x-4 py-4">
        <div className="flex flex-col">
          <p className="text-[15px]">Wallet bal:</p>
          <div className="text-[32px]">
            {details?.user.wallet.currency_symbol}{" "}
            {Number(
              details?.transaction_metrics.wallet_balance,
            ).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-[125px] w-[35px] h-[35px] border-[1px] border-solid border-[#DADADA]">
          <Icons type="horizontal-dot" />
        </div>
      </div>
      <div className="flex flex-col gap-y-6 w-full px-4">
        <div className="flex items-center justify-between">
          <p>Recent transactions</p>
          <div>
            <Icons type="vertical-dot" />
          </div>
        </div>
        <table className="w-full">
          <tbody className="flex flex-col h-[350px] pt-2 overflow-y-scroll gap-y-4">
            {details?.transaction_metrics.transactions_history?.map(
              (transaction, index) => (
                <tr
                  key={index}
                  className="flex text-[12px] font-normal text-primary-black items-center border-solid border-b-[1px] border-borderColor pb-2"
                >
                  <td className="w-3/12">
                    {UseCapitalise(transaction?.transaction_type)}
                  </td>
                  <td className="w-7/12">
                    {UseCapitalise(transaction?.description)} by @
                    {details.user.username} <br />
                    {format(new Date(transaction?.created_at), "MM/yyyy")}
                  </td>
                  <td className="w-3/12">
                    {UseCapitalise(transaction.status)}
                  </td>
                  <td
                    className={
                      transaction?.transaction_type === "debit"
                        ? "text-red-500 w-3/12"
                        : "text-green-500 w-3/12"
                    }
                  >
                    {transaction.amount}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Userstransaction;
