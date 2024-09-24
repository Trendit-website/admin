import Icons from "../../../Shared/Icons";
import Link from "next/link";
const AppealDetailsComponent = () => {
  return (
    <div className="flex flex-col px-6 gap-y-4">
      <div className="bg-[#000000] flex items-center justify-center gap-x-2 m-auto w-10/12 text-[#FFFFFF] py-2">
        This task has a timedown{" "}
        <span className="text-[#FFD0FE] text-[16px]"> 0:59</span>
      </div>
      <div className="flex items-start gap-x-4 py-4 px-4 w-10/12 bg-[#FFFFFF] m-auto border-solid border-[1px] border-borderColor rounded-[12px]">
        <Icons type="facebook" />
        <div className="flex flex-col gap-y-2">
          <p className="text-[15px] text-primary-black">
            Post adverts on your Facebook page
          </p>
          <span className="text-[12px] text-secondary">
            Post adverts of various businesses and top brands on your Facebook
            Page and earn ₦110 per advert past.
          </span>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center justify-center gap-x-2 rounded-[16px] border-[1px] py-[2px] px-[6px] border-solid border-[#E9D7FE] text-[12px] text-[#6941C6] w-[115px]">
              <Icons type="wallet" />
              #110 per post
            </div>
            <div className="flex items-center justify-center gap-x-2 rounded-[16px] border-[1px] py-[2px] px-[6px] border-solid border-[#B2DDFF] text-[12px] text-[#B2DDFF] w-[150px]">
              <Icons type="layer" />
              332 tasks available
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center m-auto justify-center gap-x-6">
        <div className="flex flex-col justify-around w-5/12 gap-y-10 font-normal text-secondary text-[14px] h-[628px] bg-[#F9FAFC] px-4 gap-y-4 py-4 rounded-[12px] border-solid border-[1px] border-borderColor">
          <div className="w-full flex items-center justify-center">Task</div>
          <div className="flex flex-col gap-y-4">
            <div>
              Please follow the step-by-step instructions below to do your task:
            </div>
            <div className="flex items-start gap-x-2">
              <span>Step1:</span>
              Open the Task Link above on your Facebook Mobile App or browser
            </div>
            <div className="flex items-center gap-x-2">
              <span>Step2:</span>
              The link will direct you to a Facebook Page which you are meant to
              follow.
            </div>
            <div className="flex items-start gap-x-2">
              <span>Step3:</span>
              Click on the Follow button on the Facebook Page to start following
              the page. You MUST NOT Unfollow the account after you have
              followed the account.
            </div>
            <div className="flex items-start gap-x-2">
              <span>Step4:</span>
              Create a screenshot of the page that shows you have followed the
              page and upload the screenshot under the Proof of Work Form below.
              You are also required to enter your Facebook Username or Name
              which you used to perform the task
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-4 items-center border-solid border-t-[1px] border-borderColor">
            <div className="-mt-[13px] bg-[#FFFFFF] px-[5px]">
              Link you task
            </div>
            <div className="flex items-center justify-between bg-[#FFFFFF] w-9/12 px-4 py-[8px]">
              <p>https://x.com/moski____</p>
              <Link href="" className="flex items-center gap-x-[3px] text-main">
                <Icons type="visit-link" />
                Visit Link
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-y-12 w-5/12 font-normal text-secondary text-[14px] h-[628px] bg-[#F9FAFC] px-4 gap-y-4 py-4 rounded-[12px] border-solid border-[1px] border-borderColor">
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-center bg-[#FFFFFF] w-[56px] border-solid border-[1px] border-borderColor h-[56px] rounded-[12px]">
              <Icons type="upload" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>Upload proof</div>
            <div className="text-center w-8/12">
              Please enter the name on your Facebook account that performed this
              task
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-4 items-center border-solid border-t-[1px] border-borderColor">
            <div className="-mt-[13px] bg-[#FFFFFF] px-[5px]">
              Link you task
            </div>
            <div className="flex items-center justify-between bg-[#FFFFFF] w-9/12 px-4 py-[8px]">
              <p>https://x.com/moski____</p>
              <Link href="" className="flex items-center gap-x-[3px] text-main">
                <Icons type="paste" />
                Paste
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center text-main bg-[#F9F5FF] text-[16px] gap-x-4 w-[159px] h-[44px] rounded-[8px] border-solid border-[1px] border-[#FFBFFA]">
                <Icons type="arrow-up" />
                Upload Proof
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppealDetailsComponent;
