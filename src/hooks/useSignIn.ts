import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/context/LoadingContext'
import { 
  SignInCredentials, 
  ApiError,
  UseSignInReturn
} from '@/types'
import { useState } from 'react'

export const useSignIn = (): UseSignInReturn => {
  const { login } = useAuth()
  const { startLoading, stopLoading } = useLoading()
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const signIn = async (credentials: SignInCredentials) => {
    setIsError(false)
    setError(null)
    setIsLoading(true)
    startLoading()
    
    try {
      const user = await login(credentials.email, credentials.password)
      setIsSuccess(true)
      
      // Navigate user based on their onboarding status
      if (!user.has_completed_profile) {
        navigate('/onboarding')
      } else {
        navigate('/dashboard')
      }
      
      return user
    } catch (err: any) {
      setIsError(true)
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
      stopLoading()
    }
  }
  
  
  const reset = () => {
    setIsError(false)
    setError(null)
    setIsSuccess(false)
  }

  return {
    signIn,
    isLoading,
    isError,
    error,
    isSuccess,
    reset,
  }
}