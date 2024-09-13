"use client"
import axios from "axios";
import { useAccessToken } from "@/hooks/useAccessToken";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjI1Njc1NCwianRpIjoiODU4ZDI5NWQtMGUzZC00Y2ZjLWE3OWMtMWY4MTJjYWYyOWIyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzI2MjU2NzU0LCJjc3JmIjoiMzg0YWNjNzEtN2E3MC00ZmVhLWEzNDctNzczZjVmYjEyNjU4IiwiZXhwIjoxNzI2MzQzMTU0fQ.BfBdYDLD_DQbXgCP8vBzitESlfe1mNVOCBR2I4t1TXM`
export const ApiClient = axios.create({
        baseURL: baseUrl,
})
ApiClient.interceptors.request.use(
    async (config) => {
      const access_token = typeof window !== 'undefined' ? useAccessToken() : null;
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);