import useSWR from "swr";
import { mutate } from "swr";
import { SocialSchema, SocialverificationSchema } from "../utils/schema/socialSchema";
import ApiClient from "../services/apiClient";
export const UseGetSocialLinkRequest = (page: number) => {
  const { data, error } = useSWR<SocialSchema>(
    `/social-profiles?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    socialRequest: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const UseApproveSocialRequest = (data: SocialverificationSchema) => {
  const approveRequest = ApiClient.post("/social-profiles/1/approve", data)
  mutate("/social-profiles/1/approve")
  return approveRequest
}
export const UseRejectSocialRequest = (data: SocialverificationSchema) => {
  const rejectRequest = ApiClient.post("/reject_social_verification_request", data)
  mutate("/reject_social_verification_request")
  return rejectRequest
}
