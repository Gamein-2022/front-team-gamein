import AxiosInstance from "./config";

export function login({ username, password }) {
  return AxiosInstance.post("/login/", { username, password });
}
