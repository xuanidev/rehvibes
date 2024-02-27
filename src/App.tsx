import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <div>
      <div>
        <Outlet />
        {/*Empty slot where render the results of the routes contained in this APP*/}
      </div>
      <div className="footer">
        <NavLink to="/terms-and-conditions">Términos y condiciones</NavLink>
        <NavLink to="/privacy">Privacy</NavLink>
      </div>
    </div>
  );
};
