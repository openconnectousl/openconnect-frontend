import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import { ResetPassword } from './pages/Auth/ResetPassword'
import Activation from './pages/Auth/Activation'
import GoogleCallback from './pages/Auth/GoogleCallback'
import Dashboard from './pages/Dashboard/Dashboard'
import CreateEvents from './pages/Dashboard/Features/CreateEvents'
import ManageUsers from './pages/Dashboard/Features/ManageUsers'
import ManageProjects from './pages/Dashboard/Features/ManageProjects'
import { MainLayout } from './components/layout/MainLayout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'create-events',
                element: <CreateEvents />,
            },
            {
                path: 'manage-users',
                element: <ManageUsers />,
            },
            {
                path: 'manage-projects',
                element: <ManageProjects />,
            },
        ],
    },
    {
        path: '/auth/login',
        element: <SignIn />,
    },
    {
        path: '/auth/signup',
        element: <SignUp />,
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/auth/reset-password',
        element: <ResetPassword />,
    },
    {
        path: '/auth/activate',
        element: <Activation />,
    },
    {
        path: '/auth/callback',
        element: <GoogleCallback />,
    },
])
