// src/utils/api.js
import axios from "axios";
import { getAccessToken, setAccessToken } from "./authService";

// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// You can intercept requests or responses before they are handled by then or catch.
// ✅ Request Interceptor → add access token
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor → handle expired access token
api.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response) => response,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  async (error) => {
    const originalRequest = error.config;

    // if 401 (unauthorized) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/Auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);
        // retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } 
      catch (refreshError) {
        console.error("Refresh token expired, logging out");
        setAccessToken(null);
        
        // ❌ DON'T DO THIS - causes infinite loop:
        // window.location.href = "/login"; 
        
        // ✅ DO THIS INSTEAD - just reject the error
        // Let the AuthContext handle the redirect logic
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;