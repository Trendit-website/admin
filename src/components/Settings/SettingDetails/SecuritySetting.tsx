const SecuritySetting = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full text-primary-black px-4 py-4">
      <h4 className="text-[18px] font-semibold">2 Factor Authentication</h4>
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex items-center justify-between w-full py-2 px-2 border-solid border-[1px] rounded-[8px] border-borderColor">
          Google Auth
          <select>
            <option>On</option>
            <option>Off</option>
          </select>
        </div>
        <div className="flex items-center justify-between w-full py-2 px-2 border-solid border-[1px] rounded-[8px] border-borderColor">
          Email Auth
          <select>
            <option>On</option>
            <option>Off</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SecuritySetting;
