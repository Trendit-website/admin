import { ApiClient } from "@/services/apiClient"
import { LoginSchema } from "@/utils/loginSchema"
import { mutate } from "swr"

export const useLogin = (data: LoginSchema) => {
   const loginUser = ApiClient.post('/admin-login', data)
   mutate('/admin-login')
   return loginUser
}