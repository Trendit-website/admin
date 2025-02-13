import Icons from "../../../Shared/Icons";
import InputField from "../../../Shared/InputField";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import PreviewImageModal from "../../../Modals/PreviewImageModal";
import {
  UseGetOrderPerformers,
  UseVerifyTaskPerformance,
} from "../../../../api/useGetOrders";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { UseCapitalise } from "../../../../utils/useCapitalise";
import { UseFormatStatus } from "../../../../utils/useFormatStatus";
const Orderperformers = ({ orderId }: { orderId: string }) => {
  const [activePage, setActivePage] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState({id: "", state: false})
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { performers, isLoading, isError } = UseGetOrderPerformers(
    orderId,
    activePage,
  )
  const NextPage = () => {
    if (performers?.total_pages) {
      activePage !== performers?.total_pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (performers?.total_pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };

  const verifyTaskPerformance = (key: string, action: string) => {
    setLoading({id: key, state: true})
    UseVerifyTaskPerformance(key, action)
      .then((response) => {
        toast.success(response.data?.message);
        setLoading({id: "", state: false})
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setLoading({id: "", state: false})
      });
  };
  const showModal = (img: string) => {
    setSelectedImage(img);
    onOpen();
  };
  return (
    <>
        <div className="text-primary-black w-full px-4">
          <div className="bg-[#FFFFFF] text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
              <>
                <table className="w-full flex flex-col">
                  <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
                    <tr className="flex items-center">
                      <td className="flex items-center w-2/12">Date</td>
                      <td className="text-[#475467] w-6/12">Performers</td>
                      <td className="text-[#475467] w-3/12">
                        Social media username
                      </td>
                      <td className="text-[#475467] w-3/12">Status</td>
                      <td className="w-3/12">Proof</td>
                      <td className="w-3/12">Action</td>
                    </tr>
                  </thead>
                  {performers && performers?.task_performances?.length !== 0 && (
                  <tbody className="flex flex-col gap-y-4 px-2">
                    {performers?.task_performances?.map((performer, index) => (
                      <tr
                        key={index}
                        className="flex items-center py-4 border-b-[1px] border-solid border-borderColor"
                      >
                        <td className="w-2/12">
                          {format(
                            new Date(
                              performer?.date_completed ||
                                performer?.started_at,
                            ),
                            "MMM dd, yyyy",
                          )}{" "}
                          <br />
                          {format(
                            new Date(
                              performer?.date_completed ||
                                performer?.started_at,
                            ),
                            " HH:mma",
                          )}
                        </td>
                        <td className="w-6/12 gap-x-[3px] flex items-start">
                          {performer?.user?.profile_picture ? (
                            <Image
                              src={performer?.user?.profile_picture}
                              alt="trendit logo"
                              width={40}
                              height={40}
                              className="-mb-4 w-[40px] h-[40px] rounded-[200px]"
                            />
                          ) : (
                            <div className="w-[40px] h-[40px] rounded-[200px]">
                              <Icons type="profile" width={40} height={40} />
                            </div>
                          )}
                          <div>
                            <p>{performer?.user?.username}</p>
                            <span>{performer?.user?.email}</span>
                          </div>
                        </td>
                        <td className="w-3/12 flex items-center gap-x-[2px]">
                          <Icons
                            type={performer?.platform}
                            width={28}
                            height={28}
                          />
                          {performer?.account_name?.slice(0, 25)}
                        </td>
                        <td className={`w-3/12 ${UseFormatStatus(performer.status)}`}>
                          {performer?.status === "completed" && "Paid"}
                          {performer?.status === "in_review" && "Pending"}
                          {performer?.status === "pending" && "Pending"}
                          {performer?.status === "cancelled" && "Declined"}
                          {performer?.status === "rejected" && "Declined"}
                        </td>
                        {!performer?.proof_screenshot_path &&
                          !performer?.post_link && (
                            <td className="w-3/12 ">No proof provided</td>
                          )}
                        {performer?.proof_screenshot_path && (
                          <td
                            className="w-3/12 flex flex-col cursor-pointer"
                            onClick={() =>
                              showModal(performer?.proof_screenshot_path)
                            }
                          >
                            View Screenshot
                            {performer?.post_link !== "" &&
                          performer?.post_link !== "undefined" && (
                              <a href={performer?.post_link} target="_blank">
                                View Post
                              </a>
                          )}
                          </td>
                        )}
                        <td className={`w-3/12 flex items-center gap-x-2 ${UseFormatStatus(performer?.status)}`}>
                          {performer?.status === "in_review" && (
                              loading.id === performer.key && loading.state ? 
                                <Icons type="loader" />
                               :
                              <>
                                <button
                                  onClick={() =>
                                    verifyTaskPerformance(
                                      performer?.key,
                                      "reject",
                                    )
                                  }
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() =>
                                    verifyTaskPerformance(
                                      performer?.key,
                                      "accept",
                                    )
                                  }
                                  className="text-main"
                                >
                                  Approve
                                </button>
                              </>
                            )}
                            {performer?.status === "pending" && (
                              loading.id === performer.key && loading.state ? 
                                <Icons type="loader" />
                               :
                              <>
                                <button
                                  onClick={() =>
                                    verifyTaskPerformance(
                                      performer?.key,
                                      "reject",
                                    )
                                  }
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() =>
                                    verifyTaskPerformance(
                                      performer?.key,
                                      "accept",
                                    )
                                  }
                                  className="text-main"
                                >
                                  Approve
                                </button>
                              </>
                            ) }
                          {performer?.status !== "in_review" &&
                            performer?.status !== "pending" &&
                            UseCapitalise(performer?.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  )}
                  {isError && (
                    <div className="w-full h-screen flex text-red-500 justify-center py-4">
                      {isError?.response?.data?.message ||
                        " An error occured try again later"}
                    </div>
                  )}
                  {isLoading && !isError && (
                    <div className="w-full h-screen flex justify-center py-4">
                      <Icons type="loader" />
                    </div>
                  )}
                  {performers && performers?.task_performances?.length === 0 && (
                      <div className="flex items-center justify-center py-10">
                          No Task Performers 
                      </div>
                  )}
                </table>
                <div className="flex w-full items-center justify-between px-4 py-4">
                  <div className="flex items-center gap-x-4">
                      <p
                        className={
                         "text-main flex items-center justify-center font-bold"
                        }
                      >
                        {activePage} of {performers && performers.total_pages > 0 ? performers.total_pages : 1}
                      </p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <button
                    disabled={activePage === 1}
                      onClick={() => PrevPage()}
                      className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
                    >
                      <Icons type="prev" />
                      Previous
                    </button>
                    <button
                    disabled={activePage === performers?.total_pages || performers?.total_pages === 0}
                      onClick={() => NextPage()}
                      className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
                    >
                      Next
                      <Icons type="next" />
                    </button>
                  </div>
                </div>
              </>
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
export default Orderperformers;
