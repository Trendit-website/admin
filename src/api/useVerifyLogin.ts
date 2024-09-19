import { ApiClient } from "@/services/apiClient";
import { mutate } from "swr";

export const UseVerifyLogin = (token: string | undefined | string[]) => {
  const verifyUser = ApiClient.post("/verify-admin-login", token);
  mutate("/verify-admin-login");
  return verifyUser;
};
