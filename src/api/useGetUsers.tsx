import { ApiClient } from "@/services/apiClient";
import { UserDetailsSchema, UserSchema } from "@/utils/userSchema";
import useSWR, { mutate } from "swr";

export const useGetAllUsers = () => {
  const { data, error } = useSWR<UserSchema>("/users", ApiClient);
  return {
    allUsers: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const useGetAllEarners = () => {
  const { data, error } = useSWR<UserSchema>("/earners", ApiClient);
  return {
    allEarners: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const useGetAllAdvertisers = () => {
  const { data, error } = useSWR<UserSchema>("/advertisers", ApiClient);
  return {
    allAdvertisers: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const useGetUsersDetails = (id: string | string[] | undefined) => {
  const UserDetails = ApiClient.post('/fetch-user', id)
  mutate("/fetch-user")
  return UserDetails
};
