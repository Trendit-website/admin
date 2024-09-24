import ApiClient from "../services/apiClient";
import { UserSchema } from "../utils/schema/userSchema";
import useSWR from "swr";

export const UseGetAdmins = () => {
  const { data, error } = useSWR<UserSchema>(`/admins`, ApiClient);
  return {
    admins: data?.data,
    isLoadingAdmins: !data,
    isErrorAdmins: error,
  };
};
