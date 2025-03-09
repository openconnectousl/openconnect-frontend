import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import {
    ApiError,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    UseForgotPasswordReturn,
} from '../types'
import { authApi } from '@/api'

export const useForgotPassword = (): UseForgotPasswordReturn => {
    const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
        ForgotPasswordResponse,
        ApiError,
        ForgotPasswordRequest
    >({
        mutationFn: async (data: ForgotPasswordRequest) => {
            try {
                const response = await authApi.requestPasswordReset(data)

                if (response.error) {
                    throw {
                        error: response.error,
                        status: 400,
                        isResponseError: true,
                    }
                }

                return response
            } catch (error: unknown) {
                const err = error as any
                if (err.isResponseError) {
                    throw error
                }

                if (err.response) {
                    throw {
                        error: err.response.data?.error || {
                            message: 'An error occurred',
                        },
                        status: err.response.status,
                    }
                }

                throw {
                    error: { message: 'Unable to connect to server' },
                    status: 500,
                }
            }
        },
        onSuccess: () => {
            toast.success(
                'Password reset instructions have been sent to your email.',
                {
                    duration: 5000,
                    position: 'top-right',
                }
            )
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
                toast.error(error.message || 'Failed to request password reset')
            }
        },
    })

    return {
        requestReset: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
