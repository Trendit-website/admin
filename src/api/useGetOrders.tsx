import { ApiClient } from "@/services/apiClient";
import { OrderDetailSchema, OrderSchema, TaskPerfomers } from "@/utils/orderSchema";
import useSWR, {mutate} from "swr";
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
export const useApproveOrders = (taskId: number) => {
  const approveOrders = ApiClient.post(`/tasks/${taskId}/approve`)
  mutate("/tasks/${taskId}/approve");
  return approveOrders;
}
export const useRejectOrders = (taskId: number) => {
  const approveOrders = ApiClient.post(`/tasks/${taskId}/`)
  mutate("/reject-task/${taskId}");
  return approveOrders;
}
export const useGetOrderPerformers = (orderKey: string, page: number) => {
  const {data, error} = useSWR<TaskPerfomers>(`/tasks/${orderKey}/performances?page=${page}&per_page=15`, ApiClient)
  return {
    performers: data?.data,
    isLoading: !data,
    isError: error
  }
}
export const useVerifyTaskPerformance = (key: string, action: string) => {
  const verifyTaskPerformance = ApiClient.post(`/tasks/verify-performance`, {
    performed_task_id_key: key,
    status: action
  })
  mutate("/tasks/verify-performance");
  return verifyTaskPerformance
}
