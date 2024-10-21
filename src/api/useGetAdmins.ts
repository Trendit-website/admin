import ApiClient from "../services/apiClient";
import { AdminDetailsSchema, UserSchema } from "../utils/schema/userSchema";
import useSWR from "swr";
import { mutate } from "swr";

export const UseGetAdmins = () => {
  const { data, error } = useSWR<UserSchema>(`/admins`, ApiClient);
  return {
    admins: data?.data,
    isLoadingAdmins: !data,
    isErrorAdmins: error,
  };
};
export const UseCreateAdmin = (email: string) => {
  const createAdmin = ApiClient.post("/create-admin", email)
  mutate("/create-admin");
  return createAdmin;
}
export const UseGetAdminProfile = () => {
  const {data, error} = useSWR<AdminDetailsSchema>("/profile", ApiClient)
  return {
    admin: data?.data.user_profile,
    isLoadingAdmin: !data,
    isError: error
  }
}
