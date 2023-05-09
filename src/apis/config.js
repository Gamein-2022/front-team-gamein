import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://172.20.10.24",
  baseURL: "https://api-team.gamein.tech",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers["Authorization"] = "Bearer " + token;
      }
      return request;
    } catch (err) {
      return err;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
