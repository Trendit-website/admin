import DefaultModal from "./modal";
import Button from "../Shared/Button";
import { useForm } from "react-hook-form";
import InputField from "../Shared/InputField";
import { LoginSchema } from "../../utils/schema/loginSchema";
import { useState, Dispatch, SetStateAction  } from "react";
import { UseCreateAdmin } from "../../api/useGetAdmins";
import Icons from "../Shared/Icons";
import toast from "react-hot-toast";
const CreateAdminModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<{admin: boolean, pricing: boolean}>>
}) => {
  const form = useForm<LoginSchema>();
  const { register, handleSubmit, watch } = form;
  const fieldContent = watch("email");
  const [isLoading, setLoading] = useState<boolean>();
  const Login = (data: LoginSchema) => {
    setLoading(true);
    UseCreateAdmin(data.email)
      .then((response) => {
        toast.success(response.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-y-4  bg-[#FFFFFF] w-full h-[320px] rounded-[12px]">
        <form
          onSubmit={handleSubmit(Login)}
          className="flex flex-col justify-center gap-y-4"
        >
          <InputField
            classNames="border-[1px] text-primary-black text-[14px] outline-none border-solid border-[#DOD5DD] rounded-[8px] py-2 pl-2 w-[350px] bg-transparent"
            type="email"
            placeholder="Enter your email"
            id="email"
            register={register("email", {
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
                `Create Admin`
              )
            }
            disabled={!fieldContent || isLoading}
            classNames={`w-[360px] py-2 rounded-[8px] text-[#FFFFFF] text-[16px] font-bold ${fieldContent && !isLoading ? "bg-[#CB29BE]" : "bg-[#CB29BE] opacity-40"}`}
          />
        </form>
      </div>
    </DefaultModal>
  );
};
export default CreateAdminModal;
