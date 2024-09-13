import { ApiClient } from "@/services/apiClient"
import useSWR from "swr"
export const useGetDashboardInsight = (range: string) => {
    const {data, error} = useSWR(`/dashboard-insight?range=${range}`, ApiClient)
    console.error(error)
    return {
      dashboardInsight: data,
      isLoading: !data || !error,
      isError: error
    }
}