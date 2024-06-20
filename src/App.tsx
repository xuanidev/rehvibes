import { Outlet } from 'react-router-dom';
import './styles/style.scss';
import SideBar from './components/Sidebar';
import { getFromCookies } from './utils/helpers';
import { ModalProvider } from './contexts/ModalContext';

export const App = () => {
  return (
    <ModalProvider>
      <div className="app">
        <SideBar />
        <Outlet />
      </div>
    </ModalProvider>
  );
};
