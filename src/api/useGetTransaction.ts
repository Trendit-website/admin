import ApiClient from "@/services/apiClient";
import { TransactionSchema } from "@/utils/transactionSchema";
import useSWR from "swr";

export const UseGetAllTransaction = () => {
  const { data, error } = useSWR<TransactionSchema>("/transactions", ApiClient);
  return {
    allTransaction: data?.data,
    isLoadingTransaction: !data,
    isErrorTransaction: error,
  };
};
export const UseGetInflowPayment = () => {
  const { data, error } = useSWR<TransactionSchema>(
    "/transactions/inflow",
    ApiClient,
  );
  return {
    inflowPayment: data?.data,
    isLoadingInflowPayment: !data,
    isErrorInflowPayment: error,
  };
};
export const UseGetOutflowPayment = () => {
  const { data, error } = useSWR<TransactionSchema>(
    "/transactions/outflow",
    ApiClient,
  );
  return {
    outflowPayment: data?.data,
    isLoadingOutFlow: !data,
    isErrorOutflow: error,
  };
};
