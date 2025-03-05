import { useState } from 'react'
import { UseGoogleAuthReturn } from '../types'
import { authApi } from '../api'
import { toast } from 'react-hot-toast'
import { useLoading } from '../context/LoadingContext'

export const useGoogleAuth = (): UseGoogleAuthReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(null)
    const { startLoading, stopLoading } = useLoading()

    const googleSignIn = () => {
        setIsLoading(true)
        startLoading("Connecting to Google...")
        
        try {
            authApi.googleSignIn()
            // No need to stopLoading here as page will redirect
        } catch (error: any) {
            setIsLoading(false)
            setIsError(true)
            setError(error)
            stopLoading()
            toast.error('Failed to initiate Google sign in')
            console.error('Google sign-in error:', error)
        }
    }

    return {
        googleSignIn,
        isLoading,
        isError,
        error,
        isSuccess: false,
    }
}