import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { UserContextProvider } from './contexts/UserContextProvider';
import './styles/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>,
);
