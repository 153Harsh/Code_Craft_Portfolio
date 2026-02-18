import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <Admin />
  }
];

export default routes;
