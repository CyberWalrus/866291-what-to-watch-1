import axios from "axios";
import {SERVER_URL} from "../mock/constants.js";

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.status === 403) {
      onLoginFail();
      return;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
