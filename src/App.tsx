import { Outlet } from 'react-router-dom';
import './styles/style.scss';
import SideBar from './components/Sidebar';
import { getFromCookies } from './utils/helpers';

const usernameHeader = getFromCookies('username');

export const App = () => {
  return (
    <div className="app">
      <SideBar username={usernameHeader} />
      <Outlet />
    </div>
  );
};
