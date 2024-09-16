import { ApiClient } from "@/services/apiClient";
import useSWR from "swr";
import { InsightSchema, SignupReportSchema } from "@/utils/insightSchema";
export const useGetOverviewReport = (range: string) => {
  const { data, error } = useSWR<InsightSchema>(
    `/dashboard-insight?range=${range}`,
    ApiClient,
  );
  return {
    overviewReport: data?.data,
    isLoading: !data,
    isError: error,
  };
};
export const useGetSignupReport = (range: string) => {
  const { data, error } = useSWR<SignupReportSchema>(
    `/signup-report?range=${range}`,
    ApiClient,
  );
  return {
    signupReport: data?.data?.signup_data,
    isLoading: !data,
    isError: error,
  };
};
