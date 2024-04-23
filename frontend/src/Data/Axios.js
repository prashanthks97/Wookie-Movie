import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://localhost:5000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("signedJWT");
  console.log(token);
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      //clear the  token from zustand  persist
      localStorage.removeItem("signedJWT");
    }
    return Promise.reject(error);
  }
);
