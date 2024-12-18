import ApiClient from "../services/apiClient";
import { OrderSchema } from "../utils/schema/orderSchema";
import useSWR from "swr";

export const UseGetAdvertTask = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(
    `/advert-tasks?page=${page}&per_page=10`,
    ApiClient,
  );
  return {
    advertTask: data?.data,
    isLoadingAdvertTask: !data,
    isErrorAdvertTask: error,
  };
};
export const UseGetEngagementTask = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(
    `/engagement-tasks?page=${page}&per_page108`,
    ApiClient,
  );
  return {
    engagementTask: data?.data,
    isLoadingEngagementTask: !data,
    isErrorEngagementTask: error,
  };
};
