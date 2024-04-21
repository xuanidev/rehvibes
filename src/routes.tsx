import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./layouts/Login";
import { Signup } from "./layouts/Signup";
import { Survey } from "./layouts/Survey";
import { Main } from "./layouts/Main";
import { Landing } from "./layouts/Landing";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

const loader = () => {
  const isAuthenticated =
    Cookies.get("uuid") !== undefined && Cookies.get("uuid") !== "";
  if (!isAuthenticated) {
    return redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/app",
        element: <Main />,
        loader: loader,
      },
    ],
  },
  {
    path: "/app",
    element: <Main />,
    loader: loader,
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
    //loader: loader,
  },
]);
