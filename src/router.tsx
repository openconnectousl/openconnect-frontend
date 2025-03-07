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
import { MyProfileLayout } from './components/layout/MyProfileLayout'
import { ViewOtherUsersIdeas } from './components/layout/ViewOtherUsersIdeas'
import MySubmissions from './components/layout/MySubmissions'
import AdminLayout from './components/admin layout/AdminLayout'
import AdminDashboard from './components/admin layout/AdminDashboard'
import AdminSetting from './components/admin layout/Admin-setting'
import AdminUsers from './components/admin layout/Admin-users'
import AdminPanelIdeas from './components/admin layout/AdminPanelIdeas'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'admin-ideas',
                element: <AdminPanelIdeas />,
            },
            {
                path: 'admin-users',
                element: <AdminUsers />,
            },
            {
                path: 'admin-settings',
                element: <AdminSetting />,
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
    {
        path: '/view-ideas',
        element: <ViewOtherUsersIdeas />,
    },
])
