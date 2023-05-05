import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer theme="dark" position="top-center" />
    <AppRoutes />
  </>
);
