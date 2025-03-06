import Icons from "../../Shared/Icons";
import Image from "next/image";
import Link from "next/link";
import {
  UseApproveSocialRequest,
  UseGetSocialLinkRequest,
  UseRejectSocialRequest,
} from "../../../api/useGetSocialLinkRequest";
import { useState } from "react";
import { UseCapitalise } from "../../../utils/useCapitalise";
import { UseFormatStatus } from "../../../utils/useFormatStatus";
import { UseTrunicate } from "../../../utils/useTrunicate";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
const RequestTable = ({tab}: {tab: string}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [activePage, setActivePage] = useState(currentPage || 1);
  const router = useRouter()
  const platformFilter = [
    "",
    "x",
    "facebook",
    "instagram",
    "threads",
    "whatsapp",
  ];
  const [platformTab, setPlatformTab] = useState(platformFilter[0]);
  const { socialRequest, isLoading, isError } = UseGetSocialLinkRequest(
    activePage,
    platformTab,
  );
  const approveRequest = (data: any) => {
    const requestData = {
      socialVerificationId: data?.id,
      type: data?.platform,
      userId: data?.user?.id,
      link: data?.link,
    };
    UseApproveSocialRequest(requestData, data?.id)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  const rejectRequest = (data: any) => {
    const requestData = {
      socialVerificationId: data?.id,
      type: data?.platform,
      userId: data?.user?.id,
      link: data?.link,
    }
    UseRejectSocialRequest(requestData, data?.id)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  const NextPage = () => {
    if (socialRequest?.total_pages) {
      activePage !== socialRequest?.total_pages
        ? (setActivePage((prevPage) => prevPage + 1), router.push(`/dashboard?tab=${tab}&page=${activePage + 1}`))
        : "";
    }
  };
  const PrevPage = () => {
    if (socialRequest?.total_pages) {
      activePage === 1 ? "" : (setActivePage((prevPage) => prevPage - 1), router.push(`/dashboard?tab=${tab}&page=${activePage - 1}`));
    }
  };
  if (isLoading && !isError) {
  }
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] flex flex-col gap-y-4 py-4 text-[12px] w-full">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-primary-black flex flex-col gap-y-2">
            <div className="flex items-center gap-x-4 text-[18px] text-[#101828]">
              Social Link Request
              <p className="text-[#344054] font-bold text-[12px] border-[1px] border-solid border-[#D0D5DD] rounded-[6px] flex items-center px-[6px] py-[1px]">
                {socialRequest?.total}
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
        <div className="flex items-center w-[300px] gap-x-4 pl-4">
          <p
            onClick={() => setPlatformTab(platformFilter[0])}
            className={`text-[14px] -mr-4 font-medium cursor-pointer ${platformTab === platformFilter[0] ? "text-main border-b[1px] border-solid border-main" : "text-[#344504]"}`}
          >
            All
          </p>
          {platformFilter.map((platform, index) => (
            <p
              onClick={() => setPlatformTab(platform)}
              key={index}
              className={`text-[14px] font-medium cursor-pointer ${platformTab === platform ? "text-main border-b[1px] border-solid border-main" : "text-[#344504]"}`}
            >
              {UseCapitalise(platform)}
            </p>
          ))}
        </div>
        <>
          <table className="w-full flex flex-col gap-y-2">
            <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
              <tr className="flex items-center">
                <td className="flex items-center gap-x-2 w-5/12">
                  <Icons type="checkbox" />
                  Name
                  <Icons type="arrow-down" />
                </td>
                <td className="flex items-center w-7/12">Links</td>
                <td className="text-[#475467] w-3/12">Action</td>
              </tr>
            </thead>
            {socialRequest && (
              <>
                <tbody className="flex flex-col gap-y-4 w-full">
                  {socialRequest?.social_profiles?.map((profiles, index) => (
                    <tr
                      key={index}
                      className="flex items-center border-solid border-b-[1px] px-4 py-2 border-primary-border"
                    >
                      <td className="w-5/12">
                        <div className="flex items-center gap-x-2">
                          <Icons type="checkbox" />
                          <div className="flex items-center gap-x-2">
                            {profiles?.user?.profile_picture ? (
                              <Image
                                src={profiles?.user?.profile_picture}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="w-[40px] h-[40px] rounded-[200px]"
                              />
                            ) : (
                              <div className="w-[40px] h-[40px] rounded-[200px]">
                                <Icons type="profile" width={35} height={35} />
                              </div>
                            )}
                            <div>
                              <p>{profiles?.user?.email}</p>
                              <span>@{profiles?.user?.username}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="flex items-start gap-x-4 w-7/12">
                        <Icons
                          type={profiles?.platform}
                          width={20}
                          height={20}
                        />
                        <div className="flex flex-col">
                          <p>{profiles?.platform}</p>
                          <Link href={profiles?.link} target="_blank">
                            {UseTrunicate(profiles?.link)}
                          </Link>
                        </div>
                      </td>
                      {profiles?.status === "pending" && (
                        <td className="flex items-center w-3/12 gap-x-4">
                          <button onClick={() => rejectRequest(profiles)}>
                            Decline
                          </button>
                          <button
                            className="text-main font-bold"
                            onClick={() => approveRequest(profiles)}
                          >
                            Approve
                          </button>
                        </td>
                      )}
                      {profiles?.status !== "pending" && (
                        <td
                          className={`flex items-center w-3/12 gap-x-4 ${UseFormatStatus(profiles?.status)}`}
                        >
                          {UseCapitalise(profiles?.status)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
                <div className="flex w-full items-center justify-between px-4">
                  <div className="flex items-center cursor-pointer gap-x-4">
                    <p className="">
                      {activePage} of {socialRequest.total_pages}
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
            )}
            {isError && (
              <div className="w-full flex text-red-500 justify-center py-8">
                An error occured try again later !!!!!
              </div>
            )}
            {isLoading && !isError && (
              <div className="w-full h-screen flex justify-center py-8">
                <Icons type="loader" />
              </div>
            )}
          </table>
        </>
      </div>
    </div>
  );
};
export default RequestTable;
