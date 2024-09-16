import { ApiClient } from "@/services/apiClient";
import { OrderDetailSchema, OrderSchema } from "@/utils/orderSchema";
import useSWR from "swr";
export const useGetOrders = () => {
  const { data, error } = useSWR<OrderSchema>(`/tasks`, ApiClient);
  return {
    orders: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const useGetPendingOrders = () => {
  const { data, error } = useSWR<OrderSchema>(`/pending-tasks`, ApiClient);
  return {
    pendingOrders: data?.data,
    isLoadingPending: !data,
    isErrorPending: error,
  };
};
export const useGetApprovedOrders = () => {
  const { data, error } = useSWR<OrderSchema>(`/approved-tasks`, ApiClient);
  return {
    approvedOrders: data?.data,
    isLoadingApproved: !data,
    isErrorApproved: error,
  };
};
export const useGetFailedOrders = () => {
  const { data, error } = useSWR<OrderSchema>(`/failed-tasks`, ApiClient);
  return {
    failedOrders: data?.data,
    isLoadingFailed: !data,
    isErrorFailed: error,
  };
};
export const useGetOrderDetails = (orderId: string | string[] | undefined) => {
  const { data, error } = useSWR<OrderDetailSchema>(
    `/tasks/${orderId}`,
    ApiClient,
  );
  return {
    orderDetails: data?.data?.task,
    isLoading: !data,
    isError: error,
  };
};
