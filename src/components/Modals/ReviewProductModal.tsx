import { useForm } from "react-hook-form";
import Button from "../Shared/Button";
import Icons from "../Shared/Icons";
import InputField from "../Shared/InputField";
import DefaultModal from "./modal";
import { useState } from "react";
import { reviewType } from "../../utils/schema/productSchema";
import { UseReviewProduct } from "../../api/useGetProduct";
import toast from "react-hot-toast";
const ReviewProductModal = ({
  isOpen,
  onClose,
  status,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  status: string;
  id: number;
}) => {
  const form = useForm<reviewType>();
  const [isLoading, setLoading] = useState<boolean>();
  const { register, handleSubmit, watch } = form;
  const fieldContent = {
    comment: watch("comment"),
    status: watch("status"),
  };
  const handleReview = (data: any) => {
    setLoading(true);
    UseReviewProduct(id, data)
      .then((response) => {
        toast.success(response.data?.message || "Success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Ann Error Occured");
      })
      .finally(() => {
        setLoading(false);
        onClose;
      });
  };
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center h-[250px]">
        <form
          onSubmit={handleSubmit(handleReview)}
          className="flex flex-col justify-center gap-y-4"
        >
          <InputField
            classNames="border-[1px] text-primary-black text-[14px] outline-none border-solid border-[#DOD5DD] rounded-[8px] py-2 pl-2 w-[350px] bg-transparent"
            type="text"
            placeholder="Write a Comment"
            id="comment"
            register={register("comment", {
              required: true,
            })}
          />
          <InputField
            classNames="border-[1px] text-primary-black text-[14px] outline-none border-solid border-[#DOD5DD] rounded-[8px] py-2 pl-2 w-[350px] bg-transparent"
            type="text"
            placeholder="Status"
            value={status}
            id="status"
            register={register("status", {
              required: true,
            })}
          />

          <Button
            label={
              isLoading ? (
                <div className="w-full flex items-center justify-center">
                  <Icons type="loader" />
                </div>
              ) : (
                `Review`
              )
            }
            disabled={!fieldContent.comment || !fieldContent.status || isLoading}
            classNames={`w-[360px] py-2 rounded-[8px] text-[#FFFFFF] text-[16px] font-bold ${fieldContent.comment && fieldContent.status && !isLoading ? "bg-[#CB29BE]" : "bg-[#CB29BE] opacity-40"}`}
          />
        </form>
      </div>
    </DefaultModal>
  );
};
export default ReviewProductModal;
