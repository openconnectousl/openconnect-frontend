import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, profileApi } from '@/api'
import toast from 'react-hot-toast'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import { AuthContextType, User } from '@/types'
import { dummyProfile, dummyUser } from '@/data/dummyUser'

let useLoadingImport: any
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    useLoadingImport = require('./LoadingContext').useLoading
} catch (e) {
    console.log('Loading context not available yet', e)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
    const navigate = useNavigate()

    const getLoadingContext = () => {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
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

                const isDev = import.meta.env.VITE_NODE_ENV === 'development'
                let token = localStorage.getItem('token')
                const expiry = localStorage.getItem('token_expiry')

                // Development mode dummy injection
                if (isDev) {
                    // Inject dummy only if token or expiry is missing
                    if (!token || !expiry) {
                        localStorage.setItem('token', 'dummy-token')
                        localStorage.setItem(
                            'token_expiry',
                            new Date(Date.now() + 3600 * 1000).toISOString()
                        )
                        token = 'dummy-token'
                    }

                    // Always return dummy user in dev mode
                    setUser(dummyProfile.profile)
                    setHasCompletedOnboarding(true)
                    console.log('Development dummy user injected')
                    return
                }

                // Production: if no token, logout
                if (!token) {
                    setUser(null)
                    return
                }

                // Normal user fetch
                const userData = await profileApi.getCurrentUserProfile()
                setUser(userData)
                setHasCompletedOnboarding(!!userData.has_completed_profile)
            } catch (error) {
                console.error('Error during auth check:', error)
                localStorage.removeItem('token')
                localStorage.removeItem('token_expiry')
                setUser(null)
            } finally {
                setIsLoading(false)
                loadingContext?.stopLoading?.()
            }
        }

        checkAuthStatus()
    }, [])

    const createProfile = async (data: Partial<User>) => {
        try {
            setIsLoading(true)
            const createdProfileUser = await profileApi.createProfile(data)
            setUser((prevUser) =>
                prevUser
                    ? { ...prevUser, ...createdProfileUser }
                    : createdProfileUser
            )

            if (data.has_completed_profile) {
                setHasCompletedOnboarding(true)
            }

            toast.success('Profile created successfully')
            return createdProfileUser
        } catch (error: any) {
            toast.error(error.message || 'Failed to create profile')
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (
        email: string,
        password: string
    ): Promise<User | undefined> => {
        setIsLoading(true)
        try {
            const response = await authApi.signIn({ email, password })

            // Store the user profile
            if (response.user) {
                setUser(response.user)

                // Check if the user has completed onboarding
                const hasCompleted = !!response.user.has_completed_profile
                setHasCompletedOnboarding(hasCompleted)

                console.log('Login successful:', {
                    user: response.user,
                    hasCompletedProfile: hasCompleted,
                })
            } else {
                setUser(null)
            }

            toast.success('Successfully signed in!')

            return response.user
        } catch (error: any) {
            console.error('Login error:', error)
            toast.error(
                error?.message || 'Login failed. Please check your credentials.'
            )
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

    // Add this method to your AuthContext
    const handleGoogleAuth = async (token: string) => {
        setIsLoading(true)
        try {
            const userData = await authApi.processGoogleCallback(token)

            setUser(userData)
            setHasCompletedOnboarding(!!userData.has_completed_profile)

            console.log('Google login successful:', {
                user: userData,
                hasCompletedProfile: !!userData.has_completed_profile,
            })
            return userData
        } catch (error: any) {
            console.error('Google login error:', error)
            toast.error(error?.message || 'Google login failed.')
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                isAdmin: user?.user_type === 'admin',
                login,
                logout,
                signup,
                createProfile,
                hasCompletedOnboarding,
                handleGoogleAuth,
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
