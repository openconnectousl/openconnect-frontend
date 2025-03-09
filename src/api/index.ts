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
    ProfileWithIdeasResponse,
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
        try {
            const response = await axiosInstance.put<ActivationResponse>(
                '/users/activated',
                {
                    token,
                }
            )
            
            if (response.data && ('error' in response.data)) {
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
                if ('error' in error.response.data) {
                    throw {
                        error: error.response.data.error,
                        status: error.response.status,
                        isResponseError: true,
                    }
                } else {
                    throw error.response.data
                }
            }
                    
    
            throw { message: 'Failed to activate account' }
        }
    },

    signIn: async (credentials: SignInCredentials): Promise<SignInResponse> => {
      try {
        const response = await axiosInstance.post<{
          authentication_token: {
            token: string
            expiry: string
          }
        }>('/auth/tokens/authentication', credentials)
    
        if (response.data.authentication_token) {
          localStorage.setItem(
            'token',
            response.data.authentication_token.token
          )
          localStorage.setItem(
            'token_expiry',
            response.data.authentication_token.expiry
          )
    
          try {
            const userResponse = await axiosInstance.get<ProfileResponse>('/profile')
            
            return {
              authentication_token: response.data.authentication_token,
              user: userResponse.data.profile
            }
          } catch (userError) {
            localStorage.removeItem('token')
            localStorage.removeItem('token_expiry')
            
            throw {
              message: 'Authentication successful but failed to fetch user profile',
              originalError: userError
            }
          }
        }
    
        throw new Error('No authentication token returned from server')
      } catch (error: any) {
        if (error.response?.status === 401) {
          throw {
            message: 'Invalid email or password',
            type: 'auth_error',
            status: 401
          }
        }
        
        if (error.response?.data) {
          throw error.response.data
        }
    
        throw error.message ? error : { message: 'Failed to sign in' }
      }
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
            const response =
                await axiosInstance.get<ProfileResponse>('/profile')

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
    },
}

export const profileApi = {
    getCurrentProfile: async (): Promise<User> => {
        const response = await axiosInstance.get<ProfileResponse>('/profile')
        return response.data.profile
    },

    updateProfile: async (data: Partial<User>): Promise<User> => {
        const response = await axiosInstance.put<ProfileResponse>(
            '/profile/new',
            data
        )
        return response.data.profile
    },

    getProfilesWithIdeas: async (limit: number, offset: number = 0): Promise<ProfileWithIdeasResponse> => {
        const response = await axiosInstance.get<ProfileWithIdeasResponse>(
            '/profiles-with-ideas',
            {
                params: { limit, offset },
            }
        )
        return response.data
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
