import Button from "@/components/Shared/Button";
const SignupReport = () => {
  const Range = ["12 months", "30 days", "7 days", "24 hours"];
  return (
    <div className="w-full h-[411px] bg-[#FFFFFF] border-[1px] border-[#E4E7EC] border-solid  flex flex-col py-4 gap-y-10 text-primary-black rounded-[12px]">
      <div className="flex items-center justify-between w-11/12 px-4 ">
        <p className="text-[18px] font-bold text-primary-black">
          Overview report
        </p>
        <Button
          classNames="flex items-center justify-center py-2 px-6 border-[1px] border-[#D0D5DD] border-solid rounded-[8px]"
          label="View report"
        />
      </div>
      <div className="ml-4 w-[290px] flex items-center gap-x-4 pb-2 border-b-[1px] border-solid border-[#E4E7EC]">
        {Range.map((range, index) => (
          <p key={index}>{range}</p>
        ))}
      </div>
    </div>
  );
};
export default SignupReport;