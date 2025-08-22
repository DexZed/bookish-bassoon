import axios from "axios";

// Create base API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

// interceptor for 401s
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // hit refresh endpoint
        //await axios.post("https://your.api/refresh", {}, { withCredentials: true });

        // retry original request
       // return api(originalRequest);
      } catch (refreshError) {
        //store.dispatch(clearAuth()); // clear redux state
        //return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export { api };