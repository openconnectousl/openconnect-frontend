import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import {
    SignInCredentials,
    SignInResponse,
    ApiError,
    UseSignInReturn,
} from '../types'

export const useSignIn = (): UseSignInReturn => {
    const navigate = useNavigate()

    const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
        SignInResponse,
        ApiError,
        SignInCredentials,
        unknown
    >({
        mutationFn: async (credentials: SignInCredentials) => {
            try {
                const response = await authApi.signIn(credentials)
                return response
            } catch (error: unknown) {
                const apiError = error as ApiError

                if (
                    apiError.error?.data?.includes(
                        'invalid authentication credentials'
                    )
                ) {
                    throw { message: 'Invalid email or password' }
                }

                if (apiError.error?.data) {
                    throw apiError.error.data
                }

                throw { message: 'An unexpected error occurred' }
            }
        },
        onSuccess: (data) => {
            if (data.authentication_token?.token) {
                localStorage.setItem('token', data.authentication_token.token)
                toast.success('Successfully signed in!')
                navigate('/')
            } else {
                toast.error('Invalid email or password')
            }
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
                toast.error(error.message || 'Invalid email or password')
            }
        },
    })
    return {
        signIn: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
