import { ApiClient } from "@/services/apiClient";
import { OrderDetailSchema, OrderSchema } from "@/utils/orderSchema";
import useSWR from "swr";
export const useGetOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(`/tasks?page=${page}&per_page=15`, ApiClient);
  return {
    orders: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const useGetPendingOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(`/pending-tasks?page=${page}&per_page=15`, ApiClient);
  return {
    pendingOrders: data?.data,
    isLoadingPendingOrders: !data,
    isErrorPendingOrders: error,
  };
};
export const useGetApprovedOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(`/approved-tasks?page=${page}&per_page=15`, ApiClient);
  return {
    approvedOrders: data?.data,
    isLoadingApprovedOrders: !data,
    isErrorApprovedOrders: error,
  };
};
export const useGetFailedOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(`/failed-tasks?page=${page}&per_page=15`, ApiClient);
  return {
    failedOrders: data?.data,
    isLoadingFailedOrders: !data,
    isErrorFailedOrders: error,
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
