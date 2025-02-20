import Icons from "../../Shared/Icons";
import RequestTable from "./requestTable";

const SocialLinkRequest = ({tab}: {tab: string}) => {
  return (
    <div className="flex flex-col bg-[#FFFFFF] ml-10 border-[1px] border-solid border-primary-border rounded-[12px] w-11/12 gap-y-4">
      <RequestTable tab={tab}/>
    </div>
  );
};
export default SocialLinkRequest;
