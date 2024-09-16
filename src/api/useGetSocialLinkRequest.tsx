import useSWR from "swr";
import { SocialSchema } from "@/utils/socialSchema";
import { ApiClient } from "@/services/apiClient";
export const useGetSocialLinkRequest = () => {
  const { data, error } = useSWR<SocialSchema>(`/social-profiles`, ApiClient);
  return {
    socialRequest: data?.data,
    isLoading: !data,
    isError: error,
  };
};
