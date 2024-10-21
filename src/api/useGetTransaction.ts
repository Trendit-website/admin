import ApiClient from "../services/apiClient";
import { PaymentRequestSchema, TransactionSchema } from "../utils/schema/transactionSchema";
import useSWR from "swr";

export const UseGetAllTransaction = (page: number) => {
  const { data, error } = useSWR<TransactionSchema>(`/transactions?page=${page}&per_page=10`, ApiClient);
  return {
    allTransaction: data?.data,
    isLoadingTransaction: !data,
    isErrorTransaction: error,
  };
};
export const UseGetInflowPayment = (page: number) => {
  const { data, error } = useSWR<TransactionSchema>(
    `/transactions/inflow?page=${page}&per_page=10`,
    ApiClient,
  );
  return {
    inflowPayment: data?.data,
    isLoadingInflowPayment: !data,
    isErrorInflowPayment: error,
  };
};
export const UseGetOutflowPayment = (page: number) => {
  const { data, error } = useSWR<TransactionSchema>(
    `/transactions/outflow?page=${page}&per_page=10`,
    ApiClient,
  );
  return {
    outflowPayment: data?.data,
    isLoadingOutFlow: !data,
    isErrorOutflow: error,
  };
};
export const UseGetPaymentRequest = (page: number) => {
  const { data, error } = useSWR<PaymentRequestSchema>(`/withdrawal-requests?page=${page}&per_page=10`, ApiClient)
  return {
    paymentRequest: data?.data,
    isLoadingRequest: !data,
    isError: error
  }
}
