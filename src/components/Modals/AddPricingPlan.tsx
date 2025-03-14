import DefaultModal from "./modal";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { addPrice } from "../../utils/schema/pricingSchema";
import { Dispatch, SetStateAction, useState } from "react";
import { UseAddPricing } from "../../api/useGetAdmins";
import toast from "react-hot-toast";

type requireProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<{ admin: boolean; pricing: boolean }>>;
};
const AddPricingPlan = ({ isOpen, onClose }: requireProps) => {
  const form = useForm<addPrice>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = form;
  const [isLoading, setLoading] = useState(false);
  const categories = [
    {
      key: "advert",
      value: "Advert",
    },
    {
      key: "engagement",
      value: "Engagement",
    },
  ];
  const handleAddPlan = (data: addPrice) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("item_name", data?.item_name)
    formData.append("price_pay", data?.price_pay)
    formData.append("price_earn", data?.price_earn)
    formData.append("price_description", data?.price_description)
    formData.append("category", data?.category)
    UseAddPricing(formData).then((response) => {
        toast.success(response.data?.message)
    }).catch((error) => {
        toast.error(error?.response?.data?.message || "An Error Occured try again later")
    }).finally(() => {
        setLoading(false)
        onClose((prev) => ({...prev, pricing: false}))
    })
  };
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-primary-black">
        <form onSubmit={handleSubmit(handleAddPlan)} className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-[6px]">
            <p>Pricing Name</p>
            <Input
              {...register("item_name", {
                required: { value: true, message: "required" },
              })}
              variant="bordered"
              type="text"
              classNames={{
                inputWrapper:
                  "!h-11 !px-4 !rounded-lg  border !transition-all data-[hover=true]:border-gray-300 dark:data-[hover=true]:border-baseBorder group-data-[focus=true]:!border-main dark:group-data-[focus=true]:!border-borderColor group-data-[invalid=true]:border-error group-data-[focus=true]:!border-2",
                input:
                  "!text-base overflow-hidden capitalize !font-medium placeholder:!font-normal placeholder:!text-gray-500 dark:!text-baseColor dark:placeholder:!text-baseColor  !text-black dark:!text-baseColor [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              }}
            />
            {errors.item_name?.message && (
              <span className="text-red-500 relative text-[10px]">
                {errors.item_name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <p>Pricing Category</p>
            <Controller
                name="category"
                  control={control}
                  rules={{ required: "required" }}
                  aria-labelledby="Select platform"
                  render={({ field }) => (
                    <Select className=""
                    selectedKeys={field.value ? [field.value] : []}
                    {...field}                    
                    >
                    {categories.map((category) => (
                        <SelectItem
                        className="text-primary-black border-[1px] mb-2"
                        key={category.key}
                        value={category.key}
                        >
                        {category.value}
                        </SelectItem>
                    ))}
                    </Select>
                )}
            />
            {errors.category?.message && (
              <span className="text-red-500 relative text-[10px]">
                {errors.category.message}
              </span>
            )}            
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <p>Amount to Pay</p>
            <Input
              errorMessage
              startContent={"₦"}
              {...register("price_pay", {
                required: { value: true, message: "required" },
              })}
              variant="bordered"
              type="text"
              classNames={{
                inputWrapper:
                  "!h-11 !px-4 !rounded-lg  border !transition-all data-[hover=true]:border-gray-300 dark:data-[hover=true]:border-baseBorder group-data-[focus=true]:!border-main dark:group-data-[focus=true]:!border-borderColor group-data-[invalid=true]:border-error group-data-[focus=true]:!border-2",
                input:
                  "!text-base overflow-hidden capitalize !font-medium placeholder:!font-normal placeholder:!text-gray-500 dark:!text-baseColor dark:placeholder:!text-baseColor  !text-black dark:!text-baseColor [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              }}
            />
            {errors.price_pay?.message && (
              <span className="text-red-500 relative text-[10px]">
                {errors.price_pay.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <p>Amount to Earn</p>
            <Input
              startContent={"₦"}
              {...register("price_earn", {
                required: { value: true, message: "required" },
              })}
              variant="bordered"
              type="text"
              classNames={{
                inputWrapper:
                  "!h-11 !px-4 !rounded-lg  border !transition-all data-[hover=true]:border-gray-300 dark:data-[hover=true]:border-baseBorder group-data-[focus=true]:!border-main dark:group-data-[focus=true]:!border-borderColor group-data-[invalid=true]:border-error group-data-[focus=true]:!border-2",
                input:
                  "!text-base overflow-hidden capitalize !font-medium placeholder:!font-normal placeholder:!text-gray-500 dark:!text-baseColor dark:placeholder:!text-baseColor  !text-black dark:!text-baseColor [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              }}
            />
            {errors.price_earn?.message && (
              <span className="text-red-500 relative text-[10px]">
                {errors.price_earn.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <p>Price Description</p>
            <Textarea
              {...register("price_description", {
                required: { value: true, message: "required" },
              })}
              variant="bordered"
              type="text"
              className="w-full"
              classNames={{
                inputWrapper: "!border !border-[1px]",
              }}
              placeholder="Enter detail description of the pricing"
            />
            {errors.price_description?.message && (
              <span className="text-red-500 relative text-[10px]">
                {errors.price_description.message}
              </span>
            )}
          </div>
          {/* <div className="flex justify-center w-full"> */}
            <button
              disabled={isLoading}
              className="bg-main text-white w-full h-[36px] rounded-[4px]"
            >
              Add Plan
            </button>
          {/* </div> */}
        </form>
      </div>
    </DefaultModal>
  );
};
export default AddPricingPlan;
