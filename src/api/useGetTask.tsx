import { ApiClient } from "@/services/apiClient";
import { OrderSchema } from "@/utils/orderSchema";
import useSWR from "swr";

export const useGetAdvertTask = () => {
  const { data, error } = useSWR<OrderSchema>(`/advert-tasks`, ApiClient);
  return {
    advertTask: data?.data,
    isLoadingAdvertTask: !data,
    isErrorAdvertTask: error,
  };
};
export const useGetEngagementTask = () => {
  const { data, error } = useSWR<OrderSchema>(`/engagement-tasks`, ApiClient);
  return {
    engagementTask: data?.data,
    isLoadingEngagementTask: !data,
    isErrorEngagementTask: error,
  };
};
