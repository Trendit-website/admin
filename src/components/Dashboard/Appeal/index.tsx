import Icons from "../../Shared/Icons";
import AppealTable from "./appealTable";
const Appeal = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  return (
    <div className="flex flex-col bg-[#FFFFFF] w-11/12 gap-y-4">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-primary-black flex flex-col gap-y-2">
          <div className="flex items-center gap-x-4 text-[18px] text-[#101828]">
            Appeal
            <p className="text-[#344054] font-bold text-[12px] border-[1px] border-solid border-[#D0D5DD] rounded-[6px] flex items-center px-[6px] py-[1px]">
              1256
            </p>
          </div>
          <span className="text-[14px] text-[#475467]">
            Manage your team members and their account permissions here.
          </span>
        </div>
        <span>
          <Icons type="vertical-dot" />
        </span>
      </div>
      <AppealTable />
    </div>
  );
};
export default Appeal;
