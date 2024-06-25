import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './styles/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
