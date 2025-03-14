import Icons from "../../../Shared/Icons";
import Image from "next/image";
import DetailsComponent from "./detailsComponent";
import Orderperformers from "./Orderperformers";
import {
  UseGetOrderDetails,
  UseApproveOrders,
  UseRejectOrders,
} from "../../../../api/useGetOrders";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useState } from "react";
const OrderDetails = () => {
  const router = useRouter();
  const { orderDetails, isLoading, isError } = UseGetOrderDetails(
    router.query?.id,
  )
  const [loading, setLoading] = useState({action: "", state: false})
  const ApproveOrder = (id: number) => {
    setLoading({action: "accept", state: true})
    UseApproveOrders(id, orderDetails?.task_key)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      }).finally(() => {
        setLoading({action: "accept", state: false})
      })
  };
  const RejectOrder = (id: number) => {
    setLoading({action: "reject", state: true})
    UseRejectOrders(id, orderDetails?.task_key)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message);
      }).finally(() => {
        setLoading({action: "reject", state: false})
      })
  };
  return (
    <div className="flex flex-col gap-y-6 px-4 py-8 w-full text-[#667185]">
      {isLoading && !isError && (
        <div className="w-full h-screen flex py-4 justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isError && (
        <div className="w-full h-screen flex text-red-500 justify-center py-4">
          {isError?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {orderDetails && (
        <>
          <div className="flex items-center w-full px-4 gap-x-2 text-[14px]">
            <p
              onClick={() => router.back()}
              className="flex cursor-pointer items-center gap-x-2"
            >
              <Icons type="arrow-back" />
              Back
            </p>
            <p className="text-[14px]">
              Earn /{" "}
              <span className="text-main">Create {orderDetails?.platform}</span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <div>
              <p className="text-primary-black font-bold text-[30px]">
                {orderDetails?.task_type
                  ? orderDetails?.task_type.charAt(0).toUpperCase() +
                    orderDetails?.task_type?.slice(1)
                  : orderDetails?.task_type}{" "}
                Task
              </p>
              <span className="text-[14px]">
                Task ID: TRENDIT/TASK_ID/{orderDetails?.id}
              </span>
            </div>
            {orderDetails?.status === "pending" && (
              <div className="flex items-center gap-x-2">
                <button
                  onClick={() =>
                    RejectOrder(orderDetails?.id ? orderDetails?.id : 0)
                  }
                  className="flex items-center bg-[#E4E7EC] py-[8px] px-[12px] rounded-[8px] text-primary-black text-[14px]"
                >
                  {loading.action === "reject" && loading.state ? <Icons type="loader" /> : "Decline"}
                </button>
                <button
                  onClick={() =>
                    ApproveOrder(orderDetails?.id ? orderDetails?.id : 0)
                  }
                  className="flex items-center bg-[#CB29BE] py-[8px] px-[12px] rounded-[8px] text-[#ffffff] text-[14px]"
                >
                 {loading.action === "accept" && loading.state ? <Icons type="loader" /> : "Approve"}
                  <Icons type="mark" />
                </button>
              </div>
            )}
          </div>
          <div className="w-full px-4 flex flex-col gap-y-2">
            <Image
              src="/assets/avatar.png"
              width={64}
              height={64}
              alt="profile picture"
            />
            <p className="text-primary-black text-[16px]">
              {orderDetails?.creator.email}
            </p>
            <span className="text-secondary text-[14px]">
              USER ID: TRENDIT/USER_ID/{orderDetails?.creator.id}
            </span>
            <div className="flex items-center w-[74px] gap-x-2 bg-[#CB29BE] text-white text-[12px] py-[2px] px-[6px] rounded-[16px]">
              Verified <Icons type="mark" />
            </div>
          </div>
          <DetailsComponent details={orderDetails} />
          <Orderperformers orderId={orderDetails?.task_key} />
        </>
      )}
    </div>
  );
};
export default OrderDetails;
