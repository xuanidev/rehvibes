import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { Login } from "./layouts/login";
import { Signup } from "./layouts/signup";

// RequireAuth component to check authentication
const RequireAuth: React.FC<any> = ({ children }) => {
  const storedAuthenticated = localStorage.getItem("authenticated") === "true";
  return storedAuthenticated ? children : <Navigate to="/login" />;
};

// Your router setup
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
