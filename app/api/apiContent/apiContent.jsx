import {
  API_ENDPOINTS,
  BACKEND_BASE_URL,
  apiCall as baseApiCall,
  apiDownload as baseApiDownload,
} from "../../lib/apiClient";

const setAccessToken = (token) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }
};

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

const apiCall = (endpoint, options = {}) => {
  const { accessToken, suppressErrorLog, ...rest } = options;
  const token = accessToken ?? getAccessToken();
  return baseApiCall(endpoint, {
    ...rest,
    accessToken: token,
    suppressErrorLog,
  });
};

const apiDownload = (endpoint, options = {}) => {
  const { accessToken, suppressErrorLog, ...rest } = options;
  const token = accessToken ?? getAccessToken();
  return baseApiDownload(endpoint, {
    ...rest,
    accessToken: token,
    suppressErrorLog,
  });
};

export {
  BACKEND_BASE_URL,
  API_ENDPOINTS,
  apiCall,
  apiDownload,
  setAccessToken,
  getAccessToken,
};
