"use client";
import axios from "axios";
import { useAccessToken } from "@/hooks/useAccessToken";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjcyOTM0OSwianRpIjoiZWVhZjhiMjctYjY4My00YTVmLTkwYTUtOGViYjJmMGUzODc4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzI2NzI5MzQ5LCJjc3JmIjoiZWRmY2MxNjAtNzBlNS00NmUxLWFjMWYtY2Q4OTY3MjQ3NmM0IiwiZXhwIjoxNzI2ODE1NzQ5fQ.EA1OQfXgQQXjvicYQJNJYyHTL6qhayIP8PA3CfARi7A`;
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
