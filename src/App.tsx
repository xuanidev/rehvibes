import { Outlet, NavLink } from "react-router-dom";
import "./styles/style.scss";

export const App = () => {
  return (
    <div>
      <div>NAV</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
