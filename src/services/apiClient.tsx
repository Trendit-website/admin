"use client";
import axios from "axios";
import { useAccessToken } from "@/hooks/useAccessToken";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const ApiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
ApiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default ApiClient;
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
