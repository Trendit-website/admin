import Icons from "@/components/Shared/Icons";
import InputField from "@/components/Shared/InputField";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import PreviewImageModal from "@/components/Modals/PreviewImageModal";
import { UseGetOrderPerformers, UseVerifyTaskPerformance } from "@/api/useGetOrders";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
const Orderperformers = ({
  orderId
}: {
  orderId: string
}) => {
  const [activePage, setActivePage] = useState(1)
  const status = ['Paid', 'Cancelled', 'Pending']
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>('')
  const { performers, isLoading, isError } = UseGetOrderPerformers(orderId, activePage)
  const pages = Array.from({length: performers?.total_pages?? 1}, (_, i) => i + 1)
  const NextPage = () => {
    if(performers?.total_pages) {
        activePage !== performers?.total_pages ?  setActivePage(prevPage => (prevPage + 1)) : ''
    }
  }
  const PrevPage = () => {
    if(performers?.total_pages) {
        activePage === 1 ? '' :  setActivePage(prevPage => (prevPage - 1))
    }
  }
  const showSpecificPage = (page: number) => {
    setActivePage(page)
  }
  const verifyTaskPerformance = (key: string, action: string) => {
    UseVerifyTaskPerformance(key, action)
    .then((response) => {
      toast.success(response.data?.message)
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message);
    })
  }
  const showModal = (img: string) => {
    setSelectedImage(img)
    onOpen();
  };
  return (
    <>
    {
      performers?.task_performances?.length !== 0 && (
        <div className="text-primary-black w-full px-4">
        <div className="bg-[#FFFFFF] text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
        <div className="flex items-center justify-around w-full py-4">
            <div className="flex flex-col gap-y-2">
              <p>Performers</p>
              <InputField type="search" placeholder="search" rightIcon="search" containerStyle="border-solid border-[1px] border-borderColor rounded-[8px] py-2 pl-2 flex items-center w-[370px] gap-x-2" classNames="border-none outline-none w-[360px]" />
            </div>
            <div>
              <p>Status</p>
              <Select label='Select status' className="w-[370px] text-secondary">
                {status.map((status, index) => (
                  <SelectItem key={index} className="text-secondary">{status}</SelectItem>
                ))}
              </Select>
            </div>
        </div>
        {
          isError && (
            <div className="w-full flex items-center justify-center py-4">
                An error occured try again later
            </div>
          )
        }
        {
          isLoading && (
            <div className="w-full flex items-center justify-center py-4">
                <Icons type="loader" />
            </div>
          )
        }
        {
          performers && (
            <>
            <table className="w-full flex flex-col">
              <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
                <tr className="flex items-center">
                  <td className="flex items-center w-2/12">
                    Date
                  </td>
                  <td className="text-[#475467] w-7/12">Performers</td>
                  <td className="text-[#475467] w-3/12">Social media username</td>
                  <td className="text-[#475467] w-3/12">Status</td>
                  <td className="w-3/12">Proof</td>
                  <td className="w-3/12">Action</td>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-y-4 px-2">
                    {
                      performers?.task_performances?.map((performer, index) => (
                        <tr key={index} className="flex items-center py-4 border-b-[1px] border-solid border-borderColor">
                        <td className="w-2/12">
                          {format(new Date(performer?.date_completed || performer?.started_at), "MMM dd, yyyy")} <br />
                          {format(new Date(performer?.date_completed || performer?.started_at), " HH:mma")}
                        </td>
                        <td className="w-7/12 gap-x-[3px] flex items-start">
                            <Image alt="avatar" src={performer?.user?.profile_picture || '/assets/avatar.png'} width={40} height={40} className="rounded-[200px] w-[40px] h-[40px]"/>
                            <div>
                                <p>{performer?.user?.username}</p>
                                <span>{performer?.user?.email}</span>
                            </div>
                        </td>
                        <td className="w-3/12 flex items-center gap-x-[2px]">
                            <Icons type={performer?.platform} width={28} height={28}/>
                            {performer?.account_name?.slice(0, 25)}
                        </td>
                        <td className="w-3/12">
                            {performer?.status === 'completed' && 'Paid'}
                            {performer?.status === 'in_review' && 'Pending'}
                            {performer?.status === 'cancelled' && 'Declined'}
                            {performer?.status === 'rejected' && 'Declined'}
                        </td>
                        {
                          !performer?.proof_screenshot_path && !performer?.post_link &&(
                            <td className="w-3/12">
                              No proof provided
                            </td>
                          )
                        }
                        {
                          performer?.proof_screenshot_path && (
                            <td className="w-3/12" onClick={() => showModal(performer?.proof_screenshot_path)}>
                              View Screenshot
                            </td>
                          )
                        }
                        {
                          performer?.post_link && (
                          <td className="w-3/12">
                            <a href={performer?.post_link}>
                            View Post
                            </a>
                          </td>
                          )
                        }
                        <td className="w-3/12 flex items-center gap-x-2">
                        {
                           performer?.status === 'in_review' && (
                            <>
                              <button disabled={ performer?.status !== 'pending' || performer?.status === 'in_review'} onClick={() => verifyTaskPerformance(performer?.key, "reject")}>Reject</button>
                              <button disabled={ performer?.status !== 'pending' || performer?.status === 'in_review'} onClick={() => verifyTaskPerformance(performer?.key, "accept")} className="text-main">Approve</button>
                            </>
                          )
                        }
                        {
                          performer?.status !== 'in_review' && (
                            performer?.status
                          )
                        }
                        </td>
                    </tr>
                      ))
                    }
              </tbody>
            </table>
            <div className="flex w-full items-center justify-between px-4">
            <div onClick={() => PrevPage()} className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
            <Icons type="prev" />
            Previous
            </div>
            <div className="flex items-center gap-x-4">
            {pages.map((page, index) => (
                <p onClick={() => showSpecificPage(page)} key={index} className={activePage === page ? 'text-main h-[20px] w-[20px] rounded-[8px] flex items-center justify-center font-bold border-[1px] border-solid border-main' : ''}>{page}</p>
            ))}
            </div>
            <div onClick={() => NextPage()} className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
            Next
            <Icons type="next" />
            </div>
    </div>
            </>
          )
        }
        </div>
      </div>
      )
    }
    <PreviewImageModal isOpen={isOpen} onClose={onClose} src={selectedImage}/>
    </>
  );
};
export default Orderperformers;
