import { Outlet } from 'react-router-dom';
import './styles/style.scss';
import SideBar from './components/Sidebar';

export const App = () => {
  return (
    <div className="app">
      <SideBar />
      <Outlet />
    </div>
  );
};
