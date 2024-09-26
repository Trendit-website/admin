import useSWR from "swr";
import ApiClient from "../services/apiClient";
import {
  liveActivitiesSchema,
  globalActivitiesSchema,
} from "../utils/schema/activitiesSchema";

export const UseGetGlobalActivities = (page: number) => {
  const { data, error } = useSWR<globalActivitiesSchema>(
    `/global-activities?page=${page}&per_page=5`,
    ApiClient,
  );
  return {
    globalActivities: data?.data,
    isLoading: !data && !error,
    isError: error,
  };
};
export const UseGetLiveActivities = (page: number) => {
  const { data, error } = useSWR<liveActivitiesSchema>(
    `/live-activities?page=${page}&per_page=5`,
    ApiClient,
  );
  return {
    liveActivities: data?.data,
    isLoading: !data && !error,
    isError: error,
  };
};
