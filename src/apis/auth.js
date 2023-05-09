import AxiosInstance from "./config";

export const login = ({ username, password }) => {
  return AxiosInstance.post("/dashboard/auth/login/", {
    phone: username,
    email: username,
    password,
  });
};

export const forgetPassword = ({ email }) => {
  return AxiosInstance.post("/dashboard/auth/forget-password/", {
    email,
  });
};

export const resetPassword = ({ code, password }) => {
  return AxiosInstance.post("/dashboard/auth/reset-password/", {
    code,
    password,
  });
};
