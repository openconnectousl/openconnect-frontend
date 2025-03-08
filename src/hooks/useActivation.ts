import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authApi } from '../api'
import { ActivationResponse, ApiError, UseActivationReturn } from '../types'

export const useActivation = (): UseActivationReturn => {
    const navigate = useNavigate()

    const { mutate, isPending, isError, error, isSuccess } = useMutation<
        ActivationResponse,
        ApiError,
        string
    >({
        mutationFn: authApi.activateUser,
        onSuccess: () => {
            toast.success('Account activated successfully')
            setTimeout(() => {
                navigate('/auth/login')
            }, 1500)
        },
        onError: (error) => {
            // Check for token-specific errors first
            if (error.error?.token) {
                const tokenError = Array.isArray(error.error.token)
                    ? error.error.token[0]
                    : error.error.token
                toast.error(`Activation failed: ${tokenError}`)
            } 
            // Check for general message
            else if (error.message) {
                toast.error(error.message)
            }
            // Fallback error
            else {
                toast.error('Failed to activate account. Please try again or contact support.')
            }
        },
    })

    return {
        activateUser: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
    }
}
