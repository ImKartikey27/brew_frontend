import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "https://brew-a1kq.onrender.com/api.v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "An error occurred";

    const customError = new Error(message);
    return Promise.reject(customError);
  }
);

export default apiClient;
