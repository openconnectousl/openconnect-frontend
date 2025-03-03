import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { authApi } from '../api'
import {
    ApiError,
    ResetPasswordRequest,
    ResetPasswordResponse,
    UseResetPasswordReturn,
} from '../types'

export const useResetPassword = (): UseResetPasswordReturn => {
    const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
        ResetPasswordResponse,
        ApiError,
        ResetPasswordRequest,
        unknown
    >({
        mutationFn: async (data: ResetPasswordRequest) => {
            await authApi.resetPassword(data)
            return {
                message: 'Password reset successfully',
            }
        },
        onSuccess: () => {
            toast.success('Password reset successfully', {
                duration: 5000,
                position: 'top-right',
            })
        },
        onError: (error) => {
            if (error.error) {
                Object.entries(error.error).forEach(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        messages.forEach((message) => {
                            toast.error(`${field}: ${message}`)
                        })
                    } else if (typeof messages === 'string') {
                        toast.error(`${field}: ${messages}`)
                    }
                })
            } else {
                toast.error(error.message || 'Failed to reset password')
            }
        },
    })

    return {
        resetPassword: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
