import { useState } from 'react'
import { UseGoogleAuthReturn } from '../types'
import { authApi } from '../api'
import { toast } from 'react-hot-toast'

export const useGoogleAuth = (): UseGoogleAuthReturn => {
    const [isLoading, setIsLoading] = useState(false)

    const googleSignIn = () => {
        setIsLoading(true)
        try {
            authApi.googleSignIn()
        } catch (error) {
            setIsLoading(false)
            toast.error('Failed to initiate Google sign in')
            console.error('Google sign-in error:', error)
        }
    }

    return {
        googleSignIn,
        isLoading,
        isError: false,
        error: null,
        isSuccess: false,
    }
}
