import useSWR from "swr";
import { mutate } from "swr";
import {
  SocialSchema,
  SocialverificationSchema,
} from "../utils/schema/socialSchema";
import ApiClient from "../services/apiClient";
export const UseGetSocialLinkRequest = (page: number, platform?: string) => {
  const { data, error } = useSWR<SocialSchema>(
    `/social-profiles?platform=${platform}&page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    socialRequest: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const UseApproveSocialRequest = async(data: SocialverificationSchema, id: number, page: number, platform?: string) => {
  const approveRequest = await ApiClient.post(`/social-profiles/${id}/approve`, data);
  await mutate(`/social-profiles?platform=${platform}&page=${page}&per_page=15`);
  return approveRequest;
};
export const UseRejectSocialRequest = async(data: SocialverificationSchema, id: number, page: number, platform?: string) => {
  const rejectRequest = await ApiClient.post(
   `/social-profiles/${id}/reject`,
    data,
  );
  await mutate(`/social-profiles?platform=${platform}&page=${page}&per_page=15`);
  return rejectRequest;
};
