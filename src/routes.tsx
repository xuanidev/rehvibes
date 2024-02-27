import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/terms-and-conditions",
        element: <div>Términos y condiciones</div>,
      },
      {
        path: "/privacy",
        element: <div>Privacy</div>,
      },
    ],
  },
]);
