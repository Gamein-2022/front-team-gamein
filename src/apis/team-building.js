import AxiosInstance from "./config";

export const getUsers = () => {
  return AxiosInstance.get("/dashboard/team/users");
};

export const sendOffer = (userId) => {
  return AxiosInstance.post("/dashboard/team/team-offer", { userId });
};

export const getTeamInfo = () => {
  return AxiosInstance.get("/dashboard/team");
};

export const getMyOffers = () => {
  return AxiosInstance.get("/dashboard/team/offers");
};

export const getSentOffers = () => {
  return AxiosInstance.get("/dashboard/team/sent-offers");
};

export const acceptOffer = (offerId) => {
  return AxiosInstance.put("/dashboard/team/accept-offer", {
    offerId,
  });
};

export const leaveTeam = () => {
  return AxiosInstance.delete("/dashboard/team");
};

export const getProfileInfo = () => {
  return AxiosInstance.get("/dashboard/team/profile");
};

export const updateProfileInfo = (info) => {
  return AxiosInstance.put("/dashboard/team/profile", info);
};

export const createTeam = (name) => {
  return AxiosInstance.post("/dashboard/team", { name });
};
