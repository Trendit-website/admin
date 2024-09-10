import Icons from "@/components/Shared/Icons";

const Userstransaction = () => {
  return (
    <div className="flex flex-col w-full gap-y-12">
      <div className="flex items-center gap-x-4 py-4">
        <div className="flex flex-col">
          <p className="text-[15px]">Wallet bal:</p>
          <div className="text-[32px]">
            #3,326.<span className="text-[#B1B1B1]">09</span>
          </div>
          <span className="text-[12px] text-[#667085]">
            Available for payouts
          </span>
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
          <tbody className="flex flex-col gap-y-4">
            <tr className="flex text-[12px] font-normal text-primary-black items-center justify-between border-solid border-b-[1px] border-borderColor pb-2">
              <td>Credit</td>
              <td>
                Referral Bonus Payment for membership Activation of @demanuel300{" "}
                <br />
                06/2024
              </td>
              <td className="text-green-500">+#244.00</td>
            </tr>
            <tr className="flex text-[12px] font-normal text-primary-black items-center justify-between border-solid border-b-[1px] border-borderColor pb-2">
              <td>Credit</td>
              <td>
                Referral Bonus Payment for membership Activation of @demanuel300{" "}
                <br />
                06/2024
              </td>
              <td className="text-green-500">+#244.00</td>
            </tr>
            <tr className="flex text-[12px] font-normal text-primary-black items-center justify-between border-solid border-b-[1px] border-borderColor pb-2">
              <td>Credit</td>
              <td>
                Referral Bonus Payment for membership Activation of @demanuel300{" "}
                <br />
                06/2024
              </td>
              <td className="text-green-500">+#244.00</td>
            </tr>
            <tr className="flex text-[12px] font-normal text-primary-black items-center justify-between border-solid border-b-[1px] border-borderColor pb-2">
              <td>Credit</td>
              <td>
                Referral Bonus Payment for membership Activation of @demanuel300{" "}
                <br />
                06/2024
              </td>
              <td className="text-green-500">+#244.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Userstransaction;
