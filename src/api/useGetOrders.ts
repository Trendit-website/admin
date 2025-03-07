import ApiClient from "../services/apiClient";
import {
  OrderDetailSchema,
  OrderSchema,
  TaskPerfomers,
} from "../utils/schema/orderSchema";
import useSWR, { mutate } from "swr";
export const UseGetOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(
    `/tasks?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    orders: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const UseGetPendingOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(
    `/pending-tasks?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    pendingOrders: data?.data,
    isLoadingPendingOrders: !data,
    isErrorPendingOrders: error,
  };
};
export const UseGetApprovedOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(
    `/approved-tasks?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    approvedOrders: data?.data,
    isLoadingApprovedOrders: !data,
    isErrorApprovedOrders: error,
  };
};
export const UseGetFailedOrders = (page: number) => {
  const { data, error } = useSWR<OrderSchema>(
    `/failed-tasks?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    failedOrders: data?.data,
    isLoadingFailedOrders: !data,
    isErrorFailedOrders: error,
  };
};
export const UseGetOrderDetails = (orderId: string | string[] | undefined) => {
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
export const UseApproveOrders = async(taskId: number, taskKey: string) => {
  const approveOrders = await ApiClient.post(`/tasks/${taskId}/approve`);
  await mutate(`/tasks/${taskKey}`);
  return approveOrders;
};
export const UseRejectOrders = async(taskId: number, taskKey: string) => {
  const rejectOrders = await ApiClient.post(`/tasks/${taskId}/reject`);
  await mutate(`/tasks/${taskKey}`);
  return rejectOrders;
};
export const UseGetOrderPerformers = (orderKey: string, page: number) => {
  const { data, error } = useSWR<TaskPerfomers>(
    `/tasks/${orderKey}/performances?page=${page}&per_page=15`,
    ApiClient,
  );
  return {
    performers: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const UseGetOrderPerformersByStatus = (
  status: string,
  orderKey: string,
) => {
  const { data, error } = useSWR(
    `/tasks/${orderKey}/performances?status=${status}`,
  );
  return {
    performer: data,
    isLoading: !data,
    isErrorStatus: error,
  };
};
export const UseVerifyTaskPerformance = async(key: string, action: string, page: number, orderKey: string) => {
  const verifyTaskPerformance = await ApiClient.post(`/tasks/verify-performance`, {
    performed_task_id_key: key,
    status: action,
  });
  await mutate(`/tasks/${orderKey}/performances?page=${page}&per_page=15`);
  return verifyTaskPerformance;
};
