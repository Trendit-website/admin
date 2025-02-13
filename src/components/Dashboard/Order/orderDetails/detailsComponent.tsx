import Icons from "../../../Shared/Icons";
import Image from "next/image";
import Link from "next/link";
import bg from "./Background pattern decorative.png";
import { useDisclosure } from "@nextui-org/react";
import PreviewImageModal from "../../../Modals/PreviewImageModal";
import { useState } from "react";
import { UseFormatStatus } from "../../../../utils/useFormatStatus";
const DetailsComponent = ({ details }: { details: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const showModal = (img: string) => {
    setSelectedImage(img);
    onOpen();
  };
  return (
    <>
      <div className="flex items-center justify-between gap-x-6 w-full">
        <div className="flex flex-col w-6/12 h-[570px] bg-[#F9FAFC] px-4 gap-y-4 py-4 rounded-[12px] border-solid border-[1px] border-borderColor">
          <div className="w-full px-4">
            <p
              className={`w-[71px] h-[22px] text-[12px] text-[#B54708] py-[2px] px-[6px] text-center border-solid border-[1px] border-[#FEDF89] rounded-[16px] ${UseFormatStatus(details?.status)}`}
            >
              {details?.status.charAt(0).toUpperCase() +
                details?.status?.slice(1)}
            </p>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <p className="ml-4 text-[14px] text-[#344054]">Order Type</p>
            <div className="flex items-start gap-x-4 w-10/12 bg-[#FFFFFF] py-2 px-4 rounded-[12px]">
              <Icons type={details?.platform} />
              <div className="flex flex-col gap-y-2">
                <p className="text-[15px] text-primary-black">
                  Post adverts on your{" "}
                  {details?.platform.charAt(0).toUpperCase() +
                    details?.platform?.slice(1)}{" "}
                  page
                </p>
                <span className="text-[12px] text-secondary">
                  Post adverts of various businesses and top brands on your
                  {details?.platform.charAt(0).toUpperCase() +
                    details?.platform?.slice(1)}{" "}
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
          </div>
          <div className="w-full pb-2 flex m-auto w-10/12 flex-col gap-y-4 text-[#344054] border-solid border-b-[1px] border-borderColor">
            {details?.platform && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">Platform</p>
                <p className="text-[14px] font-bold">
                  {details?.platform.charAt(0).toUpperCase() +
                    details?.platform?.slice(1)}
                </p>
              </div>
            )}
            {details?.target_country && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">Country</p>
                <p className="text-[14px] font-bold">
                  {details?.target_country.charAt(0).toUpperCase() +
                    details?.target_country?.slice(1)}
                </p>
              </div>
            )}
            {details?.target_state && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">State</p>
                <p className="text-[14px] font-bold">
                  {details?.target_state.charAt(0).toUpperCase() +
                    details?.target_state?.slice(1)}
                </p>
              </div>
            )}
            {details?.posts_count && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">
                  No of{" "}
                  {details?.platform.charAt(0).toUpperCase() +
                    details?.platform?.slice(1)}{" "}
                  posts that you want
                </p>
                <p className="text-[14px] font-bold">{details?.posts_count}</p>
              </div>
            )}
            {details?.engagements_count && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">
                  No of {details?.platform} posts that you want
                </p>
                <p className="text-[14px] font-bold">
                  {details?.engagements_count}
                </p>
              </div>
            )}
            {details?.gender && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">Gender</p>
                <p className="text-[14px] font-bold">
                  {details?.gender.charAt(0).toUpperCase() +
                    details?.gender?.slice(1)}
                </p>
              </div>
            )}
            {details?.religion && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px] font-medium">Religion</p>
                <p className="text-[14px] font-bold">
                  {details?.religion.charAt(0).toUpperCase() +
                    details?.religion?.slice(1)}
                </p>
              </div>
            )}
            {details?.media_path && (
              <div className="flex w-full items-center justify-between px-4">
                <p className="text-[14px]">Media</p>
                <div className="flex items-center gap-x-2">
                  {details?.media_path?.map((img: string, index: number) => (
                    <Image
                      src={img}
                      key={index}
                      width={34}
                      height={34}
                      onClick={() => showModal(img)}
                      alt="advert media "
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-[#344054] flex items-center justify-between px-4">
            <p className="font-normal">Sub-total</p>
            <p className="font-medium text-secondary">
              ₦{Number(details?.fee_paid).toLocaleString()}.00
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-around w-6/12 gap-y-10 font-normal text-secondary text-[14px] h-[570px] bg-[#F9FAFC] px-4 gap-y-4 py-4 rounded-[12px] border-solid border-[1px] border-borderColor">
          <div className="w-full flex items-center justify-center">Task</div>
          <div className="flex flex-col gap-y-4">
            <div>
              Please follow the step-by-step instructions below to do your task:
            </div>
            <div className="flex items-start gap-x-2">
              <span className="font-bold text-secondary">Step1:</span>
              Open the Task Link above on your {details?.platform} Mobile App or
              browser
            </div>
            <div className="flex items-center gap-x-2">
              <span className="font-bold text-secondary">Step2:</span>
              The link will direct you to a {details?.platform} Page which you
              are meant to follow.
            </div>
            <div className="flex items-start gap-x-2">
              <span className="font-bold text-secondary">Step3:</span>
              Click on the Follow button on the {details?.platform} Page to
              start following the page. You MUST NOT Unfollow the account after
              you have followed the account.
            </div>
            <div className="flex items-start gap-x-2">
              <span className="font-bold text-secondary">Step4:</span>
              Create a screenshot of the page that shows you have followed the
              page and upload the screenshot under the Proof of Work Form below.
              You are also required to enter your {details?.platform} Username
              or Name which you used to perform the task
            </div>
          </div>
          {details?.account_link && (
            <div className="w-full flex flex-col gap-y-4 items-center border-solid border-t-[1px] border-borderColor">
              <div className="-mt-[13px] bg-[#FFFFFF] px-[5px]">
                Link to your task
              </div>
              <div className="flex items-center justify-between bg-[#FFFFFF] w-9/12 px-4 py-[8px]">
                <p>{details?.account_link}</p>
                <Link
                  href={details?.account_link}
                  className="flex items-center gap-x-[3px] text-main"
                >
                  <Icons type="visit-link" />
                  Visit Link
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <PreviewImageModal
        isOpen={isOpen}
        onClose={onClose}
        src={selectedImage}
      />
    </>
  );
};
export default DetailsComponent;
