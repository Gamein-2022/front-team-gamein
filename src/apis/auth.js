import AxiosInstance from "./config";


export const login = ({ username, password }) => {
  return AxiosInstance.post("/team/auth/login/", {
    phone: username,
    email: username,
    password,
  });
};

export const forgetPassword = ({ email }) => {
  return AxiosInstance.post("/team/auth/forget-password/", {
    email,
  });
};

export const resetPassword = ({ code, password }) => {
  return AxiosInstance.post("/team/auth/reset-password/", {
    code,
    password,
  });
};
