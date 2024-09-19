import useSWR from "swr";
import { SocialSchema } from "@/utils/socialSchema";
import { ApiClient } from "@/services/apiClient";
export const UseGetSocialLinkRequest = (page: number) => {
  const { data, error } = useSWR<SocialSchema>(`/social-profiles?page=${page}&per_page=15`, ApiClient);
  return {
    socialRequest: data?.data,
    isLoading: !data,
    isError: error,
  };
};
