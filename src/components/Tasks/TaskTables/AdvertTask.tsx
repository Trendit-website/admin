import Icons from "@/components/Shared/Icons";
import { format } from "date-fns";
const AdvertTask = ({
  activeTab,
  advertTasks,
  isLoadingTask,
}: {
  activeTab: string;
  advertTasks: any;
  isLoadingTask: boolean;
}) => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] text-[12px] w-11/12 m-auto border-[1px] border-solid border-primary-border rounded-[12px]">
        {isLoadingTask && (
          <div className="flex items-center justify-center py-6">
            <Icons type="loader" />
          </div>
        )}
        {advertTasks && (
          <>
            <div className="flex items-center justify-between w-full px-6 py-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-4">
                  <h3 className="text-[18px] text-primary-black text-semibold">
                    {activeTab}
                  </h3>
                  <div className="flex items-center justify-center w-[45px] h-[21px] px-4 text-[12px] text-[#344054] border-[1px] rounded-[6px] border-solid border-borderColor">
                    {advertTasks?.total}
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
              <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
                {advertTasks?.tasks.map((task: any, index: number) => (
                  <tr
                    className="flex items-center py-4 border-borderColor border-b-[1px] border-solid"
                    key={index}
                  >
                    <td className="flex items-start gap-x-[5px] w-9/12">
                      <Icons type={task?.platform} />
                      <div className="flex flex-col gap-y-[3px]">
                        <p className="text-primary-black text-[14px] font-medium">
                          Post adverts on your {task?.platform} page
                        </p>
                        <span className="text-[14px] text-[#475467] w-11/12">
                          {task?.caption}
                        </span>
                      </div>
                    </td>
                    <td className="w-2/12">{task?.posts_count}</td>
                    <td className="w-2/12">#110</td>
                    <td className="w-2/12">
                      {format(new Date(task?.updated_at), "MMM dd, yyyy")}
                    </td>
                    <td>
                      <Icons type="vertical-dot" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex items-center justify-between py-4 px-4">
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
  );
};
export default AdvertTask;
