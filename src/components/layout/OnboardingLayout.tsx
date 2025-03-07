import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const SimpleHeader = () => (
    <header className="bg-white shadow-sm py-3 px-6 flex items-center justify-between">
        {/* Simple logo-only header */}
        <div className="flex items-center">
            <img src="/logo.svg" alt="OpenConnect" className="h-8 w-auto" />
        </div>
    </header>
)

export const OnboardingLayout = () => {
    const { hasCompletedOnboarding } = useAuth()

    // If user has completed onboarding, redirect to dashboard
    if (hasCompletedOnboarding) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SimpleHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}
