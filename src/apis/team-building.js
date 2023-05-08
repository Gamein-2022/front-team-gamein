import AxiosInstance from "./config";

export const getUsers = () => {
  return AxiosInstance.get("/dashboard/team-building/users");
};

export const sendOffer = (userId) => {
  return AxiosInstance.post("/dashboard/team-building/team-offer", { userId });
};

export const getTeamInfo = () => {
  return AxiosInstance.get("/dashboard/team");
};

export const getMyOffers = () => {
  return AxiosInstance.get("/dashboard/team-building/offers");
};

export const getSentOffers = () => {
  return AxiosInstance.get("/dashboard/team-building/sent-offers");
};

export const acceptOffer = (offerId) => {
  return AxiosInstance.put("/dashboard/team-building/accept-offer", {
    offerId,
  });
};

export const leaveTeam = () => {
  return AxiosInstance.delete("/dashboard/team-building");
};
