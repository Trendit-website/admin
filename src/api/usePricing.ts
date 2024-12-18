import ApiClient from "../services/apiClient";
import useSWR from "swr";

export const UseGetPricing = () => {
  const { data, error } = useSWR("/pricing", ApiClient);
  return {
    pricing: data,
    isError: error,
    isLoadingPrice: !data,
  };
};
