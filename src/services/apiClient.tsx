"use client";
import axios from "axios";
import { useAccessToken } from "@/hooks/useAccessToken";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjQ2NTI1NywianRpIjoiOTlkMGU2YWUtZWU5Zi00OTBhLWJkY2UtNTEzMzhjNmVmZDI5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzI2NDY1MjU3LCJjc3JmIjoiYzFjN2YwYTktYTRmZC00ZDU2LTgxMmUtOTk4YjY2NmVjMzYzIiwiZXhwIjoxNzI2NTUxNjU3fQ.ER75jB-hU_48z-UEIVnCjvdKqc57SQaeer27_53ZONI`;
export const ApiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
// ApiClient.interceptors.request.use(
//     async (config) => {
//       const access_token = typeof window !== 'undefined' ? useAccessToken() : null;
//       if (access_token) {
//         config.headers.Authorization = `Bearer ${access_token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );
