import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LoadingScreen } from '@/components/common/LoadingScreen'

export const AuthenticatedLayout = () => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingScreen message="Loading..." />
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
}
