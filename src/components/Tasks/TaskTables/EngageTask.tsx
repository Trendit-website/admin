import Icons from "../../Shared/Icons";
import { format } from "date-fns";
import { useState } from "react";
import { UseGetEngagementTask } from "../../../api/useGetTask";
import Link from "next/link";
const EngageTask = () => {
  const [activePage, setActivePage] = useState(1);
  const { engagementTask, isLoadingEngagementTask, isErrorEngagementTask } =
    UseGetEngagementTask(activePage);
  const NextPage = () => {
    if (engagementTask?.pages) {
      activePage !== engagementTask?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (engagementTask?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  }
  const pages = Array.from(
    { length: engagementTask?.pages ?? 1 },
    (_, i) => i + 1,
  );
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] text-[12px] w-11/12 m-auto border-[1px] border-solid border-primary-border rounded-[12px]">
          <>
            <div className="flex items-center justify-between w-full px-6 py-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-4">
                  <h3 className="text-[18px] text-primary-black text-semibold">
                    Engagement Task
                  </h3>
                  <div className="flex items-center justify-center w-[45px] h-[21px] px-4 text-[12px] text-[#344054] border-[1px] rounded-[6px] border-solid border-borderColor">
                    {engagementTask?.total}
                  </div>
                </div>
                <span>
                  Manage your team members and their account permissions here.
                </span>
              </div>
              <div>
                <Icons type="vertical-dot" />
              </div>
            </div>
            <table className="w-full flex flex-col">
              <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
                <tr className="flex items-center">
                  <td className="flex items-center gap-x-[5px] w-8/12">
                    <Icons type="checkbox" />
                    Type
                  </td>
                  <td className="w-2/12">Task count</td>
                  <td className="w-2/12">Price/Post</td>
                  <td className="w-2/12">Last updated</td>
                </tr>
              </thead>
              {engagementTask && (
                <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
                  {engagementTask?.tasks.map((task: any, index: number) => (
                    <tr
                      className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                      key={index}
                    >
                      <td className="flex items-start gap-x-[5px] w-9/12">
                        <Link
                          href={`/orders/${task?.task_key}`}
                          className="flex items-start gap-x-2"
                        >
                          <Icons type={task?.platform} width={20} height={20} />
                          <div className="flex flex-col gap-y-[3px]">
                            <p className="text-primary-black text-[14px] font-medium">
                              {task?.goal?.charAt(0).toUpperCase() +
                                task?.goal?.slice(1)}{" "}
                              posts on your{" "}
                              {task?.platform.charAt(0).toUpperCase() +
                                task?.platform?.slice(1)}{" "}
                              page
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="w-2/12">{task?.engagements_count}</td>
                      <td className="w-2/12">₦{Number(task?.fee_paid).toLocaleString()}.00</td>
                      <td className="w-2/12">
                        {format(new Date(task?.updated_at), "MMM dd, yyyy")}
                      </td>
                      <td>
                        <Icons type="vertical-dot" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
              {isErrorEngagementTask && (
                <div className="w-full text-red-500 h-screen text-red-500 flex justify-center">
                  {isErrorEngagementTask?.response?.data?.message ||
                    " An error occured try again later"}
                </div>
              )}
              {isLoadingEngagementTask && !isErrorEngagementTask && (
                <div className="flex flex-col h-screen items-center justify-center py-6">
                  <Icons type="loader" />
                </div>
              )}
            </table>
            <div className="flex w-full items-center justify-between px-4 py-6">
              <div className="flex items-center cursor-pointer gap-x-4">
                <p className="">
                  {activePage} of {engagementTask && engagementTask.pages}
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
      </div>
    </div>
  );
};
export default EngageTask;
