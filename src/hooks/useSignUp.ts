// src/hooks/useSignUp.ts
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api'
import {
    SignUpResponse,
    ApiError,
    SignUpRequest,
    UseSignUpReturn,
} from '../types'

export const useSignUp = (): UseSignUpReturn => {
    const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
        SignUpResponse,
        ApiError,
        SignUpRequest
    >({
        mutationFn: async (data: SignUpRequest) => {
            return authApi.signUp(data)
        },
        onSuccess: (data) => {
            if (data.user.email) {
                toast.success('Successfully signed up!')
            } else {
                toast.error('An unexpected error occurred')
            }
        },
        onError: (error: ApiError) => {
            const emailError = error?.error?.email
            const isEmailExistsError =
                typeof emailError === 'string' &&
                emailError.includes('already exists')

            if (!isEmailExistsError) {
                toast.error(error.message || 'An unexpected error occurred')
            }
        },
    })

    return {
        signUp: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
