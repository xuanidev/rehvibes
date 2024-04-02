import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { Login } from "./layouts/login";
import { Signup } from "./layouts/signup";
import { Survey } from "./layouts/survey";
import { Main } from "./layouts/main";
import { Landing } from "./layouts/landing";
// RequireAuth component to check authentication
/*const RequireAuth: React.FC<any> = ({ children }) => {
  const storedAuthenticated = localStorage.getItem("authenticated") === "true";
  return storedAuthenticated ? children : <Navigate to="/login" />;
};*/
const isAuthenticated = () => {
  return localStorage.getItem("authenticated") === "true";
};

// Your router setup
export const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <App /> : <Landing />,
    children: isAuthenticated()
      ? [
          {
            path: "/app",
            element: <Main />,
          },
        ]
      : [],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/survey",
    element: <Survey />,
  },
]);
