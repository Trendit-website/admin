import useSWR from "swr";
import ApiClient from "../services/apiClient";
import { notificationSchema } from "../utils/schema/activitiesSchema";
export const UseGetNotifications = (page: number) => {
  const { data, error } = useSWR<notificationSchema>(
    `/notifications?page=${page}&per_page=10`,
    ApiClient,
  );
  return {
    notification: data?.data,
    isLoadingNotification: !data,
    isNotificationError: error,
  };
};
