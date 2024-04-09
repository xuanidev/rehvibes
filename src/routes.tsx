import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { Login } from "./layouts/login";
import { Signup } from "./layouts/signup";
import { Survey } from "./layouts/survey";
import { Main } from "./layouts/main";
import { Landing } from "./layouts/landing";
import Cookies from "js-cookie";

function PrivateRoute({ children }: any) {
  const isAuthenticated =
    Cookies.get("uuid") !== undefined && Cookies.get("uuid") !== "";
  return isAuthenticated ? children : <Landing />;
}
function PrivateRouteSurvey({ children }: any) {
  const isAuthenticated =
    Cookies.get("uuid") !== undefined && Cookies.get("uuid") !== "";
  return isAuthenticated ? children : <Login />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <App />
          </PrivateRoute>
        ),
      },
    ],
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
    element: (
      <PrivateRouteSurvey>
        <Survey />
      </PrivateRouteSurvey>
    ),
  },
]);
