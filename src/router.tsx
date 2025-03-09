// src/router.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout'
import { OnboardingLayout } from './components/layout/OnboardingLayout'
import { MainLayout } from './components/layout/MainLayout'

// Pages
import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ProfileOnboarding from './pages/Onboarding/index'
import { MyProfileLayout } from './components/layout/MyProfileLayout'
import MySubmissions from './components/layout/MySubmissions'
import { ViewOtherUsersIdeas } from './components/layout/ViewOtherUsersIdeas'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import Community from './pages/Community'
import { Feed } from './pages/Feed/index'
import ResetPassword from './pages/Auth/ResetPassword'
import Activation from './pages/Auth/Activation'
import GoogleCallback from './pages/Auth/GoogleCallback'

export const Router = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route
                    path="/auth/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/auth/activate" element={<Activation />} />

                <Route path="/auth/callback" element={<GoogleCallback />} />

                {/* Other public routes */}
            </Route>

            {/* Protected Routes */}
            <Route element={<AuthenticatedLayout />}>
                {/* Onboarding Routes */}
                <Route element={<OnboardingLayout />}>
                    <Route path="/onboarding" element={<ProfileOnboarding />} />
                </Route>

                {/* Main App Routes (require completed onboarding) */}
                <Route element={<MainLayout />}>
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/profile" element={<MyProfileLayout />} />
                    <Route path="/my-submissions" element={<MySubmissions />} />
                    <Route
                        path="/view-ideas"
                        element={<ViewOtherUsersIdeas />}
                    />
                    {/* Other authenticated routes */}
                </Route>
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
