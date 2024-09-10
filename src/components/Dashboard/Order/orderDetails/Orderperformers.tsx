import Icons from "@/components/Shared/Icons";
import InputField from "@/components/Shared/InputField";
import Image from "next/image";
const Orderperformers = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
        <div className="w-full flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-x-[3px]">
            <Icons type="prev" />
            Previous
          </div>
          <div className="flex items-center gap-x-4">
            {pages.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="flex items-center gap-x-[3px]">
            Next
            <Icons type="next" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orderperformers;
