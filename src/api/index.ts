import { axiosInstance } from '../lib/axios'
import {
    SignUpRequest,
    SignUpResponse,
    ActivationResponse,
    SignInCredentials,
    SignInResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from '../types'

export const authApi = {
    signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
        try {
            const response = await axiosInstance.post<SignUpResponse>(
                '/users',
                data
            )

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            return response.data
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'An unexpected error occurred' }
        }
    },

    activateUser: async (token: string): Promise<ActivationResponse> => {
        const response = await axiosInstance.put<ActivationResponse>(
            '/users/activated',
            {
                token,
            }
        )
        return response.data
    },

    signIn: async (credentials: SignInCredentials): Promise<SignInResponse> => {
        const response = await axiosInstance.post<SignInResponse>(
            '/auth/tokens/authentication',
            credentials
        )
        return response.data
    },

    googleSignIn: () => {
        const backendUrl = import.meta.env.VITE_API_URL
        localStorage.removeItem('token')
        sessionStorage.removeItem('googleAuthState')

        sessionStorage.setItem('googleAuthReturnTo', window.location.pathname)

        window.location.href = `${backendUrl}/auth/google/login`
    },

    requestPasswordReset: async (
        data: ForgotPasswordRequest
    ): Promise<ForgotPasswordResponse> => {
        try {
            const response = await axiosInstance.post<ForgotPasswordResponse>(
                '/auth/tokens/password-reset-request',
                data
            )

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            return response.data
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'An unexpected error occurred' }
        }
    },

    resetPassword: async (
        data: ResetPasswordRequest
    ): Promise<ResetPasswordResponse> => {
        try {
            const response = await axiosInstance.put<ResetPasswordResponse>(
                '/users/password-reset',
                data
            )

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            return response.data
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'An unexpected error occurred' }
        }
    },
}
