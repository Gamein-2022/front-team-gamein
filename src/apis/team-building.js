import AxiosInstance from "./config";

export const getUsers = () => {
  return AxiosInstance.get("/team/team/users");
};

export const sendOffer = (userId) => {
  return AxiosInstance.post("/team/team/team-offer", { userId });
};

export const getTeamInfo = () => {
  return AxiosInstance.get("/team/team");
};

export const getMyOffers = () => {
  return AxiosInstance.get("/team/team/offers");
};

export const getSentOffers = () => {
  return AxiosInstance.get("/team/team/sent-offers");
};

export const acceptOffer = (offerId) => {
  return AxiosInstance.put("/team/team/accept-offer", {
    offerId,
  });
};

export const leaveTeam = () => {
  return AxiosInstance.delete("/team/team");
};

export const getProfileInfo = () => {
  return AxiosInstance.get("/team/team/profile");
};

export const updateProfileInfo = (info) => {
  return AxiosInstance.put("/team/team/profile", info);
};

export const createTeam = (name) => {
  return AxiosInstance.post("/team/team", { name });
};
