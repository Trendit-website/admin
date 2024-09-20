"use client";
import axios from "axios";
import { useAccessToken } from "@/hooks/useAccessToken";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjgxNjMwNywianRpIjoiNjM0ZmQ4ZDgtZTllZC00ZDUxLWJjZDItNjUxMzM2YTEwYzJlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzI2ODE2MzA3LCJjc3JmIjoiZjkwMjM2ZmItNjg0MS00OTcxLThhZjItN2U4N2IzMjU3ZmRmIiwiZXhwIjoxNzI2OTAyNzA3fQ.Znrq1kBtgfjgsb2hLqiZmEz2dSYqPpFmOMS3wgjZY4o`;
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
