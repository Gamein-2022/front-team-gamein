import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

const THEME = createTheme({
  typography: {
    fontFamily: `"kalameh", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ThemeProvider theme={THEME}>
      <ToastContainer theme="dark" position="top-center" />
      <AppRoutes />
    </ThemeProvider>
  </>
);
