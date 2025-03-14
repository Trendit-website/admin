import { UseGetPendingOrders } from "../../../../api/useGetOrders";
import { useState } from "react";
import Icons from "../../../Shared/Icons";
import Link from "next/link";
import { format } from "date-fns";
import { UseFormatStatus } from "../../../../utils/useFormatStatus";
const PendingOrders = () => {
  const [activePage, setActivePage] = useState(1);
  const { pendingOrders, isLoadingPendingOrders, isErrorPendingOrders } =
    UseGetPendingOrders(activePage);
  const NextPage = () => {
    if (pendingOrders?.pages) {
      activePage !== pendingOrders?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (pendingOrders?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  if (isLoadingPendingOrders && !isErrorPendingOrders) {
    return (
      <table className="w-full flex flex-col gap-y-2">
        <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
          <tr className="flex items-center">
            <td className="flex items-center gap-x-2 w-10/12">
              <Icons type="checkbox" />
              Tasks
            </td>
            <td className="text-[#475467] w-3/12 ml-4">Type</td>
            <td className="text-[#475467] w-3/12 -ml-2">Amount paid</td>
            <td className="flex items-center gap-x-[2px] w-2/12">
              Date created <Icons type="arrow-down" />
            </td>
            <td className="text-[#475467] text-right w-2/12">Status</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-y-4 px-2">
          <div className="w-full h-screen flex items-center justify-center">
            <Icons type="loader" />
          </div>
        </tbody>
      </table>
    );
  }
  if (isErrorPendingOrders) {
    return (
      <table className="w-full flex flex-col gap-y-2">
        <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
          <tr className="flex items-center">
            <td className="flex items-center gap-x-2 w-10/12">
              <Icons type="checkbox" />
              Tasks
            </td>
            <td className="text-[#475467] w-3/12 ml-4">Type</td>
            <td className="text-[#475467] w-3/12 -ml-2">Amount paid</td>
            <td className="flex items-center gap-x-[2px] w-2/12">
              Date created <Icons type="arrow-down" />
            </td>
            <td className="text-[#475467] text-right w-2/12">Status</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-y-4 px-2">
          <div className="w-full flex text-red-500 justify-center py-4">
            {isErrorPendingOrders?.response?.data?.message ||
              " An error occured try again later"}
          </div>
        </tbody>
      </table>
    );
  }
  return (
    <>
      {pendingOrders && (
        <>
          <table className="w-full flex flex-col gap-y-2">
            <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
              <tr className="flex items-center">
                <td className="flex items-center gap-x-2 w-10/12">
                  <Icons type="checkbox" />
                  Tasks
                </td>
                <td className="text-[#475467] w-3/12 ml-4">Type</td>
                <td className="text-[#475467] w-3/12 -ml-2">Amount paid</td>
                <td className="flex items-center gap-x-[2px] w-2/12">
                  Date created <Icons type="arrow-down" />
                </td>
                <td className="text-[#475467] text-right w-2/12">Status</td>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-y-4 px-2">
              {pendingOrders?.tasks?.map((order, index) => (
                <tr
                  key={index}
                  className="flex items-center border-b-[1px] border-solid border-borderColor py-4"
                >
                  <td className="w-7/12">
                    <Link
                      href={`/orders/${order?.task_key}`}
                      className="flex items-start gap-x-2"
                    >
                      <Icons type={order?.platform} width={20} height={20} />
                      <div>
                        <p className="text-[14px] text-[#101828]">
                          Post adverts on your {order?.platform} page
                        </p>
                      </div>
                    </Link>
                  </td>

                  <td className="w-2/12 ">
                    {order?.task_type?.charAt(0).toUpperCase() +
                      order?.task_type?.slice(1)}
                  </td>
                  <td className=" w-2/12">
                    #{Number(order?.fee_paid).toLocaleString()}.00
                  </td>
                  <td className="w-2/12">
                    {format(new Date(order.date_created), "MMM dd, yyyy")}
                  </td>
                  <td
                    className={`w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px] ${UseFormatStatus(order?.status)}`}
                  >
                    {order?.status?.charAt(0).toUpperCase() +
                      order?.status?.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full items-center justify-between px-4">
            <div className="flex items-center cursor-pointer gap-x-4">
              <p className="">
                {activePage} of {pendingOrders.pages}
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
export default PendingOrders;
