import ApiClient from "@/services/apiClient";
import { LoginSchema } from "@/utils/schema/loginSchema";
import { mutate } from "swr";

export const UseLogin = (data: LoginSchema) => {
  const loginUser = ApiClient.post("/admin-login", data);
  //  ApiClient.post("/admin-login", data);
  mutate("/admin-login");
  return loginUser;
};
