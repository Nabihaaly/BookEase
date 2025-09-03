// src/utils/authService.js

// store token (and persist it in localStorage)
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

// get token
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// remove token (for logout)
export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
};
