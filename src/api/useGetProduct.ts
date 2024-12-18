import useSWR from "swr";
import { mutate } from "swr";
import ApiClient from "../services/apiClient";
import { detailsType, productType } from "../utils/schema/productSchema";

export const UseGetProducts = (page: number) => {
  const { data, error } = useSWR<productType>(
    `/products?page=${page}&limit=10`,
    ApiClient,
  );
  return {
    allProducts: data?.data,
    allProductError: error,
  };
};
export const UsegetProductDetails = (id: any) => {
  const { data, error } = useSWR<detailsType>(`/products/${id}`, ApiClient);
  return {
    details: data?.data.product,
    detailsError: error,
  };
};
export const UseReviewProduct = (
  id: number,
  data: { status: string; comment: string },
) => {
  const reviewProduct = ApiClient.post(`/products/${id}/review`, data);
  mutate(`/products/${id}/review`);
  return reviewProduct;
};
