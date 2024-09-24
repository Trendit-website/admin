import { Input } from "@nextui-org/react";
const Prefrence = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full px-4 py-3 text-[18px] text-primary-black ">
        Email Alerts
      </div>
      <div className="flex flex-col text-primary-black w-full gap-y-4 px-4">
        <div className="flex items-center gap-x-2 text-[16px] text-secondary">
          <input type="checkbox" />
          New features and updates
        </div>
        <div className="flex items-center gap-x-2 text-[16px] text-secondary">
          <input type="checkbox" />
          New Tasks
        </div>
        <div className="flex items-center gap-x-2 text-[16px] text-secondary">
          <input type="checkbox" />
          Money Earned
        </div>
      </div>
      <div className="w-full px-4 py-3 text-[18px] text-primary-black ">
        In-app Alerts
      </div>
      <div className="flex flex-col text-primary-black w-full gap-y-4 px-4">
        <div className="flex items-center gap-x-2 text-[16px] text-secondary">
          <input type="checkbox" />
          New features and updates
        </div>
        <div className="flex items-center gap-x-2 text-[16px] text-secondary">
          <input type="checkbox" />
          New Tasks
        </div>
        <div className="flex items-center gap-x-2 text-[16px] text-secondary">
          <input type="checkbox" />
          Money Earned
        </div>
      </div>
      <div className="w-full px-4 py-3 text-[18px] text-primary-black ">
        Settlement
      </div>
      <div className="flex items-center px-4 w-5/12 justify-between text-secondary">
        <span className="text-[14px]">Autopay unresolved settlement</span>
        <p className="font-bold text-[14px]">After 5days</p>
      </div>
    </div>
  );
};
export default Prefrence;
