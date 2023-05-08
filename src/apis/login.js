import AxiosInstance from "./config";

export function login({ username, password }) {
  return AxiosInstance.post("dashboard/auth/login/", {
    phone: username,
    email: username,
    password,
  });
}
