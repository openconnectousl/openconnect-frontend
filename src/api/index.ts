import { axiosInstance } from '@/lib/axios'
import {
    ActivationResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    IdeaSubmissionRequest,
    IdeaSubmissionResponse,
    ProfileWithIdeasResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    SignInCredentials,
    SignInResponse,
    SignUpRequest,
    SignUpResponse,
    User,
    UserProfileByIdResponse,
    UserProfileResponse,
    isActivationError,
    isSignInError,
    isSignUpError,
} from '../types'
import { dummyProfile } from '@/data/dummyUser'

export const authApi = {
    signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
        try {
            const response = await axiosInstance.post<SignUpResponse>(
                '/users',
                data
            )

            if (isSignUpError(response.data)) {
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

            console.log('Activation response:', response.data)
            if (isActivationError(response.data)) {
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

    signIn: async (
        credentials: SignInCredentials
    ): Promise<SignInResponse & { user?: User }> => {
        try {
            const response = await axiosInstance.post<SignInResponse>(
                '/auth/tokens/authentication',
                credentials
            )

            if (isSignInError(response.data)) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            //  fetch the user profile with the new token

            if (response.data.authentication_token) {
                localStorage.setItem(
                    'token',
                    response.data.authentication_token.token
                )
                localStorage.setItem(
                    'token_expiry',
                    response.data.authentication_token.expiry
                )

                //  fetch the user profile with the new token
                try {
                    let userResponse: User

                    if (import.meta.env.VITE_NODE_ENV === 'development') {
                        userResponse = dummyProfile.profile
                    } else {
                        userResponse = await profileApi.getCurrentUserProfile()
                    }

                    // Return combined data with token and user profile
                    return {
                        authentication_token:
                            response.data.authentication_token,
                        user: userResponse,
                    }
                } catch (profileError) {
                    // If profile fetch fails, remove token and rethrow
                    localStorage.removeItem('token')
                    localStorage.removeItem('token_expiry')
                    console.error(
                        'Failed to fetch user profile after login:',
                        profileError
                    )
                    throw new Error(
                        "Authentication succeeded but couldn't load user profile"
                    )
                }
            } else {
                throw new Error('Authentication token not received from server')
            }
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw { message: error.response.data.error }
            }
            throw error
        }
    },
    googleSignIn: () => {
        const backendUrl = import.meta.env.VITE_API_URL

        // Clean up any existing tokens
        localStorage.removeItem('token')
        localStorage.removeItem('token_expiry')
        sessionStorage.removeItem('googleAuthState')

        // Save the current path to return to after authentication
        sessionStorage.setItem('googleAuthReturnTo', window.location.pathname)

        // Redirect to backend Google auth endpoint
        window.location.href = `${backendUrl}/auth/google/login`
    },

    // Add this new method for handling the Google OAuth callback
    processGoogleCallback: async (token: string): Promise<User> => {
        try {
            // Store the token for subsequent requests
            localStorage.setItem('token', token)

            // Use the token to fetch the user profile
            const userResponse = await profileApi.getCurrentUserProfile()
            console.log('Google Auth userResponse:', userResponse)

            return userResponse
        } catch (error) {
            console.error('Failed to process Google authentication:', error)
            localStorage.removeItem('token')
            throw error
        }
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

export const profileApi = {
    getCurrentUserProfile: async (): Promise<User> => {
        try {
            const response =
                await axiosInstance.get<UserProfileResponse>('/profile')

            // Handle nested profile structure
            if (response.data.profile) {
                return response.data.profile
            }

            throw new Error('Unexpected profile response structure')
        } catch (error: any) {
            console.error('Error fetching user profile:', error)

            if (error.response?.data) {
                throw error.response.data
            }

            throw {
                message: 'Failed to fetch user profile',
                originalError: error,
            }
        }
    },

    createProfile: async (data: Partial<User>): Promise<User> => {
        const response = await axiosInstance.post<UserProfileResponse>(
            '/profile/new',
            data
        )
        return response.data.profile
    },

    getProfilesWithIdeas: async (
        limit: number,
        offset: number = 0
    ): Promise<ProfileWithIdeasResponse> => {
        const response = await axiosInstance.get<ProfileWithIdeasResponse>(
            '/profiles-with-ideas',
            {
                params: { limit, offset },
            }
        )
        return response.data
    },

    getUserProfileById: async (
        userId: string
    ): Promise<UserProfileByIdResponse> => {
        try {
            const response = await axiosInstance.get<UserProfileByIdResponse>(
                `/profiles/id/${userId}`
            )
            return response.data
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data
            }
            throw error
        }
    },

    updateProfile: async (data: Partial<User>): Promise<User> => {
        try {
            const response = await axiosInstance.patch<UserProfileResponse>(
                '/profile/update',
                data
            )

            if (response.data.profile) {
                return response.data.profile
            }

            throw new Error('Unexpected profile update response structure')
        } catch (error: any) {
            console.error('Error updating user profile:', error)

            if (error.response?.data) {
                throw error.response.data
            }

            throw {
                message: 'Failed to update user profile',
                originalError: error,
            }
        }
    },
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

// getProfileByUsername: async (username: string): Promise<User> => {
//     const response = await axiosInstance.get<User>(`/users/profile/${username}`)
//     return response.data

// searchProfiles: async (query: string, filters?: Record<string, any>): Promise<User[]> => {
//     const response = await axiosInstance.get<User[]>('/user/profiles/search', {
//         params: {
//             query,
//             ...filters
//         }
//     })
//     return response.data

export const ideaApi = {
    submitIdea: async (
        data: IdeaSubmissionRequest
    ): Promise<IdeaSubmissionResponse> => {
        try {
            if (!data.user_id) {
                try {
                    const userProfile = await profileApi.getCurrentUserProfile()
                    data = {
                        ...data,
                        user_id: userProfile.id,
                    }
                } catch (profileError) {
                    console.error(
                        'Failed to fetch user profile for idea submission:',
                        profileError
                    )
                    throw new Error('User ID is required for idea submission')
                }
            }
            const response = await axiosInstance.post<IdeaSubmissionResponse>(
                '/ideas',
                data
            )
            return response.data
        } catch (error: any) {
            if (error.response?.data) {
                throw {
                    message:
                        error.response.data.message || 'Failed to submit idea',
                    error: error.response.data.error,
                    status: error.response.status,
                }
            }
            throw {
                message: 'An unexpected error occurred',
                originalError: error,
            }
        }
    },

    getIdeas: async (limit: number = 10, offset: number = 0) => {
        const response = await axiosInstance.get('/ideas', {
            params: { limit, offset },
        })
        return response.data
    },

    getIdeaById: async (ideaId: string) => {
        const response = await axiosInstance.get(`/ideas/${ideaId}`)
        return response.data
    },
}
