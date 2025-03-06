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
export const UseApproveSocialRequest = (data: SocialverificationSchema, id: number) => {
  const approveRequest = ApiClient.post(`/social-profiles/${id}/approve`, data);
  mutate("/social-profiles/1/approve");
  return approveRequest;
};
export const UseRejectSocialRequest = (data: SocialverificationSchema, id: number) => {
  const rejectRequest = ApiClient.post(
   `/social-profiles/${id}/reject`,
    data,
  );
  mutate(`/social-profiles/${id}/reject`);
  return rejectRequest;
};
