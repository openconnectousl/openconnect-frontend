export interface UserProfile {
    id: number
    name: string
    title: string
    faculty: string
    program: string
    image: string
}

export interface ProfessionalNetworkGridProps {
    users: UserProfile[]
    searchQuery: string
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    facultyFilter: string
    sortBy: string
    onFacultyChange: (value: string) => void
    onSortChange: (value: string) => void
    filteredUsers: UserProfile[]
}

export interface RouterContext {
    requests: Array<{
        id: number
        name: string
        title: string
        image: string
    }>
    users: UserProfile[]
    isRequestPanelOpen: boolean
    setIsRequestPanelOpen: (isOpen: boolean) => void
}

export interface SearchParams {
    query: string
    page: number
    limit: number
}

export interface ProfessionalNetworkHeaderProps {
    searchQuery: string
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    facultyFilter: string
    sortBy: string
    onFacultyChange: (value: string) => void
    onSortChange: (value: string) => void
    totalUsers: number
    filteredUsers: number
}

export interface SignUpRequest {
    username: string
    email: string
    password: string
}

export interface User {
    id: string
    name: string
    email: string
    activated: boolean
    created_at: string
    version: number
}

export interface ApiResponse<T> {
    user: T
    error?: ApiError
}

export interface ValidationError {
    field: string
    message: string
}

export interface ValidationErrors {
    [key: string]: string[]
}
export type SignUpResponse = ApiResponse<User>

export interface ApiError {
    message?: string
    type?: 'auth_error' | 'validation_error' | 'server_error'
    error?: {
        email?: string | string[]
        username?: string | string[]
        password?: string | string[]
        [key: string]: string | string[] | undefined
    }
}
export interface SignUpHookResult {
    signUp: (data: SignUpRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess?: boolean
    reset?: () => void
}

export interface UseSignUpReturn {
    signUp: (data: SignUpRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface ActivationResponse {
    user: User
}

export interface UseActivationReturn {
    activateUser: (token: string) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
}

export interface SignInCredentials {
    email: string
    password: string
}

export interface AuthenticationToken {
    token: string
    expiry: string
}

export interface SignInResponse {
    authentication_token: AuthenticationToken
}

export interface UseSignInReturn {
    signIn: (credentials: SignInCredentials) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface UseGoogleAuthReturn {
    googleSignIn: () => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
}

export interface SignUpError extends ApiError {
    errors?: {
        email?: string[]
        name?: string[]
        password?: string[]
    }
}

export interface SignUpValidationError {
    field: keyof SignUpRequest
    message: string
}

export interface SuccessMessageProps {
    title: string
    description: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ForgotPasswordResponse {
    message: string
    error?: ApiError
}

export interface UseForgotPasswordReturn {
    requestReset: (data: ForgotPasswordRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface ResetPasswordRequest {
    password: string
    token: string
}

export interface ResetPasswordResponse {
    message: string
    error?: ApiError
}

export interface UseResetPasswordReturn {
    resetPassword: (data: ResetPasswordRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface SuccessMessageModalProps extends SuccessMessageProps {
    isOpen: boolean
    onClose: () => void
    email?: string
    type?:
        | 'signup'
        | 'accountExists'
        | 'passwordReset'
        | 'passwordResetComplete'
}
