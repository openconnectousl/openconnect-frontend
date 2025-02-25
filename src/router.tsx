import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Home from '@/app/page';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'auth/signin',
        element: <SignIn />
      },
      {
        path: 'auth/signup',
        element: <SignUp />
      }
    ]
  }
]);