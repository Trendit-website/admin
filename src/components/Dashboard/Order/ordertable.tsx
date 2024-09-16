import {
  useGetOrders,
  useGetPendingOrders,
  useGetApprovedOrders,
  useGetFailedOrders,
} from "@/api/useGetOrders";
import Icons from "@/components/Shared/Icons";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import InputField from "@/components/Shared/InputField";

const Ordertable = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  const { orders, isLoading, isError } = useGetOrders();
  const { pendingOrders } = useGetPendingOrders();
  const { approvedOrders } = useGetApprovedOrders();
  const { failedOrders } = useGetFailedOrders();
  const [activeOrders, setActiveOrders] = useState<any[]>();
  const [num_available_order, setNum_available_order] = useState<Number>();
  const Tabs = ["All", "Pending", "Approved", "Cancelled"];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  useEffect(() => {
    setActiveOrders(orders?.tasks);
    setNum_available_order(orders?.total);
  }, [orders, activeOrders]);
  useEffect(() => {
    activeTab === Tabs[0] &&
      (setActiveOrders(orders?.tasks), setNum_available_order(orders?.total));
    activeTab === Tabs[1] &&
      (setActiveOrders(pendingOrders?.tasks),
      setNum_available_order(pendingOrders?.total));
    activeTab === Tabs[2] &&
      (setActiveOrders(approvedOrders?.tasks),
      setNum_available_order(approvedOrders?.total));
    activeTab === Tabs[3] &&
      (setActiveOrders(failedOrders?.tasks),
      setNum_available_order(failedOrders?.total));
  });
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-primary-black flex items-center gap-x-2 w-full">
          {Tabs.map((tab, index) => (
            <div
              key={index}
              className={`w-[114px] flex items-center justify-center pb-2 ${activeTab === tab ? "text-main border-solid border-b-[1px] border-main" : ""}`}
            >
              <p onClick={() => setActiveTab(tab)} className="text-[16px]">
                {tab}
              </p>{" "}
              {activeTab === tab && (
                <span className="text-[12px] flex items-center justify-center border-solid border-b-[1px] border-[#E4E7EC] w-[28px] h-[22px] rounded-[16px] bg-[#F9FAFB]">
                  {num_available_order ? String(num_available_order) : ""}
                </span>
              )}
            </div>
          ))}
        </div>
        <InputField
          type="text"
          classNames="w-[320px] border-solid border-[2px] pl-4 rounded-[8px] border-[#D0D5DD] py-2"
          placeholder="Search"
        />
      </div>
      <div className="text-primary-black w-full px-4">
        <div className="bg-[#FFFFFF] flex flex-col gap-y-4 py-6 text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
          {isLoading && (
            <div className="w-full flex items-center justify-center">
              <Icons type="loader" />
            </div>
          )}
          {activeOrders && (
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
                  {activeOrders?.map((order, index) => (
                    <tr
                      key={index}
                      className="flex items-center border-b-[1px] border-solid border-borderColor py-4"
                    >
                      <td className="w-7/12">
                        <Link
                          href={`/orders/${order?.task_key}`}
                          className="flex items-start gap-x-2"
                        >
                          <Icons
                            type={order?.platform}
                            width={20}
                            height={20}
                          />
                          <div>
                            <p className="text-[14px] text-[#101828]">
                              Post adverts on your {order?.platform} page
                            </p>
                            <span>{order?.caption}</span>
                          </div>
                        </Link>
                      </td>

                      <td className="w-2/12 ">
                        {order?.task_type?.charAt(0).toUpperCase() +
                          order?.task_type?.slice(1)}
                      </td>
                      <td className=" w-2/12">{order?.fee_paid}</td>
                      <td className="w-2/12">
                        {format(new Date(order.date_created), "MMM dd, yyyy")}
                      </td>
                      <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                        {order?.status?.charAt(0).toUpperCase() +
                          order?.status?.slice(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex w-full items-center justify-between px-4">
                <div className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
                  <Icons type="prev" />
                  Previous
                </div>
                <div className="flex items-center gap-x-4">
                  {pages.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
                <div className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
                  Next
                  <Icons type="next" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Ordertable;
