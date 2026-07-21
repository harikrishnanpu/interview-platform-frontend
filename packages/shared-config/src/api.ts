import axios from "axios";
import { MESSAGES } from "./messages";
import { API_BASE_URL } from "./routes";

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      MESSAGES.requestFailed;
    return Promise.reject(new Error(message));
  }
);
