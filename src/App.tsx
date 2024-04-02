import { Outlet, NavLink } from "react-router-dom";

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
