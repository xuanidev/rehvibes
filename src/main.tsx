import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx"; // Import the AuthProvider from routes.tsx
import "./styles/style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
