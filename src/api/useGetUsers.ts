import ApiClient from "../services/apiClient";
import { UserDetailsSchema, UserSchema } from "../utils/schema/userSchema";
import useSWR, { mutate } from "swr";

export const UseGetAllUsers = (page: number) => {
  const { data, error } = useSWR<UserSchema>(
    `/users?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    allUsers: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const FilterUserEmail = (email: string) => {
  const { data, error } = useSWR<UserSchema>(
    `/users?email=${email}`,
    ApiClient,
  );
  return {
    user: data?.data,
    isLoadingUser: !data,
    isErrorUser: error,
  };
};
export const FilterUsername = (username: string) => {
  const { data, error } = useSWR(`/users?username=${username}`, ApiClient);
  return {
    user: data,
    isLoadingUser: !data,
    isErrorUser: error,
  };
};
export const UseGetAllEarners = (page: number) => {
  const { data, error } = useSWR<UserSchema>(
    `/earners?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    allEarners: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const UseGetAllAdvertisers = (page: number) => {
  const { data, error } = useSWR<UserSchema>(
    `/advertisers?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    allAdvertisers: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const UseGetUsersDetails = (id: number) => {
  const UserDetails = ApiClient.post("/fetch-user", {
    id: id,
  });
  mutate("/fetch-user");
  return UserDetails;
};
