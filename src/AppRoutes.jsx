import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyTeamInfo from "./pages/MyTeamInfo";
import Search from "./pages/Search";
import TeamRequests from "./pages/TeamRequests";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-team-info" element={<MyTeamInfo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/team-requests" element={<TeamRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
