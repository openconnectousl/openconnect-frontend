import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, profileApi } from '@/api'
import toast from 'react-hot-toast'
import { User } from '@/types'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { useLoading } from './LoadingContext'

let useLoadingImport: any
try {
    // This will be dynamically accessed only when needed
    useLoadingImport = require('./LoadingContext').useLoading
} catch (e) {
    console.log('Loading context not available yet')
}
interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<User>
    logout: () => void
    signup: (email: string, password: string, username: string) => Promise<void>
    updateProfile: (data: Partial<User>) => Promise<User>
    hasCompletedOnboarding: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
    const navigate = useNavigate()

    const getLoadingContext = () => {
        try {
            return useLoadingImport ? useLoadingImport() : null
        } catch (e) {
            return null
        }
    }

    useEffect(() => {
        const checkTokenExpiry = () => {
            const token = localStorage.getItem('token')
            const expiry = localStorage.getItem('token_expiry')

            if (token && expiry) {
                const expiryDate = new Date(expiry)
                if (expiryDate < new Date()) {
                    // Token expired
                    console.log('Token expired, logging out')
                    logout()
                }
            }
        }

        // Check on mount and every 5 minutes
        checkTokenExpiry()
        const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const loadingContext = getLoadingContext()

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setIsLoading(true)
                loadingContext?.startLoading?.('Checking authentication...')

                // Your auth check logic here
                const token = localStorage.getItem('token')
                if (!token) {
                    setUser(null)
                    return
                }

                const userData = await authApi.getCurrentUser()
                setUser(userData)
                setHasCompletedOnboarding(!!userData.has_completed_profile)
            } catch (error) {
                console.error(error)
                localStorage.removeItem('token')
                setUser(null)
            } finally {
                setIsLoading(false)
                loadingContext?.stopLoading?.()
            }
        }

        checkAuthStatus()
    }, [])

    const updateProfile = async (data: Partial<User>) => {
        try {
            setIsLoading(true)
            const updatedUser = await profileApi.updateProfile(data)
            setUser((prevUser) =>
                prevUser ? { ...prevUser, ...updatedUser } : updatedUser
            )

            if (data.has_completed_profile) {
                setHasCompletedOnboarding(true)
            }

            toast.success('Profile updated successfully')
            return updatedUser
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile')
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const response = await authApi.signIn({ email, password })
            setUser(response.user)
            setHasCompletedOnboarding(!!response.user.has_completed_profile)

            // Token is already stored in localStorage by the API function
            toast.success('Successfully signed in!')
            return response.user
        } catch (error: any) {
            console.error('Login error:', error)
            toast.error(error?.message || 'Login failed')
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (
        email: string,
        password: string,
        username: string
    ) => {
        setIsLoading(true)
        try {
            await authApi.signUp({ email, password, username })
            // Don't navigate - wait for email activation
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/auth/login')
    }
    if (isLoading) {
        return <LoadingScreen message="Setting up your experience..." />
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
                signup,
                updateProfile,
                hasCompletedOnboarding,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

