"use client";
import axios from "axios";
import { useAccessToken } from "@/hooks/useAccessToken";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjY0MjY2OSwianRpIjoiZDg2MTc1Y2EtOGFhNC00OWUwLTk1OTQtZDI0ZjgxZThjMWViIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzI2NjQyNjY5LCJjc3JmIjoiM2NlMzFkNmYtOTJjMC00ZTEyLThiMDMtZWI3YTEzNzkwOGE3IiwiZXhwIjoxNzI2NzI5MDY5fQ.2t6LW8GDRK1Q-rLj_ASVzDYcLemTX9ZKMPmpTpMiimM`;
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
