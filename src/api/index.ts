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
    User,
    ProfileResponse,
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
        );
        
        // After getting the token, immediately fetch user data
        if (response.data.authentication_token) {
            // Store token first so the next request can use it
            localStorage.setItem('token', response.data.authentication_token.token);
            localStorage.setItem('token_expiry', response.data.authentication_token.expiry);

            
            // Then fetch user profile
            try {
                const userResponse = await axiosInstance.get<ProfileResponse>('/profile');
                // Return combined data that matches your interface
                return {
                    authentication_token: response.data.authentication_token,
                    user: userResponse.data.profile
                };
            } catch (error) {
                // If profile fetch fails, remove token and rethrow
                localStorage.removeItem('token');
                throw error;
            }
        }
        
        return response.data;
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

    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await axiosInstance.get<ProfileResponse>('/profile')

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }

            }
            // Backend returns data in an envelope with "profile" key
            return response.data.profile
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'Failed to fetch current user profile' }

        }
    }
}

export const profileApi = {
    getCurrentProfile: async (): Promise<User> => {
        const response = await axiosInstance.get<ProfileResponse>('/profile')
        return response.data.profile

    },
    
    updateProfile: async (data: Partial<User>): Promise<User> => {
        const response = await axiosInstance.put<ProfileResponse>('/profile/new', data)
        return response.data.profile
    }

    // uploadProfileImage: async (file: File): Promise<{url: string}> => {
    //     const formData = new FormData()
    //     formData.append('avatar', file)
    //     const response = await axiosInstance.post('/user/profile/avatar', formData)
    //     return response.data
    // },

    // updateSkills: async (skills: strings[]): Promise<User> => {
    //     const response = await axiosInstance.put('/user/profile/skills', {skills})
    //     return response.data
    // },

    // getProfileByUsername: async (username: string): Promise<User> => {
    //     const response = await axiosInstance.get<User>(`/users/profile/${username}`)
    //     return response.data
    // }

    // searchProfiles: async (query: string, filters?: Record<string, any>): Promise<User[]> => {
    //     const response = await axiosInstance.get<User[]>('/user/profiles/search', {
    //         params: {
    //             query,
    //             ...filters
    //         }
    //     })
    //     return response.data
    // }
}

