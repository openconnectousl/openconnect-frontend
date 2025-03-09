import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authApi } from '../api'
import { SignInCredentials, SignInResponse, ApiError, UseSignInReturn } from '../types'
import { useAuth } from '../context/AuthContext'

export const useSignIn = (): UseSignInReturn => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
    SignInResponse,
    ApiError,
    SignInCredentials
  >({
    mutationFn: (credentials: SignInCredentials) => {
      return authApi.signIn(credentials)
    },
    onSuccess: (data) => {
      // Store user data in auth context
      if (data.user) {
          setUser?.(data.user)
          
          console.log('User data:', data.user)
        
        // Check if user has completed profile
        if (data.user.has_profile_created) {
          toast.success('Successfully signed in!')
          navigate('/community')
        } else {
          toast.success('Welcome! Please complete your profile')
          navigate('/onboarding')
        }
      } else {
        // This shouldn't happen with our updated API function
        toast.success('Signed in successfully!')
        navigate('/community')
      }
    },
    onError: (error: ApiError) => {
      if (error.type === 'auth_error') {
        toast.error(error.message || 'Invalid email or password')
      } else if (error.error?.email) {
        toast.error(`Email error: ${Array.isArray(error.error.email) ? error.error.email[0] : error.error.email}`)
      } else if (error.error?.password) {
        toast.error(`Password error: ${Array.isArray(error.error.password) ? error.error.password[0] : error.error.password}`)
      } else {
        toast.error(error.message || 'Failed to sign in')
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