import axios from "axios";
import {SERVER_URL} from "../constants";
import {AxiosResponse, AxiosError, AxiosInstance} from "axios";

export const createAPI = (onLoginFail: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSuccess = (response: AxiosResponse): AxiosResponse => response;
  const onFail = (error): AxiosError => {
    if (error.status === 403) {
      onLoginFail();
      return;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
