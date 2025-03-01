import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import Home from '@/app/page'
import SignIn from '@/pages/auth/SignIn'
import SignUp from '@/pages/auth/SignUp'
import { MyProfileLayout } from './components/layout/MyProfileLayout'
import { ForgotPw } from './pages/auth/ForgotPw'
import { ChangePw } from './pages/auth/ChangePw'
import MySubmissions from './components/layout/MySubmissions'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MyProfileLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'auth/signin',
                element: <SignIn />,
            },
            {
                path: 'auth/signup',
                element: <SignUp />,
            },
        ],
    },
])
