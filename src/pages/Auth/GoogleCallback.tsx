// src/features/auth/components/GoogleCallback.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Spinner from '@/components/Spinner/Spinner.component'
import { Button } from '@/components/ui/button'

const GoogleCallback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const error = params.get('error')
        const validationErrors = params.get('errors')

        const handleError = () => {
            if (validationErrors) {
                try {
                    const errors = JSON.parse(validationErrors)
                    if (errors.email?.includes('already exists')) {
                        return {
                            title: 'Account Already Exists',
                            message:
                                'An account with this email already exists. Please sign in with your password.',
                            action: '/auth/login',
                        }
                    }
                } catch (e) {
                    console.error(e)
                    // JSON parse error, fall through to default
                }
            }
            return {
                title: 'Authentication Failed',
                message: error || 'Something went wrong during authentication.',
                action: '/auth/login',
            }
        }

        if (token) {
            localStorage.setItem('token', token)
            toast.success('Successfully signed in with Google!', {
                duration: 4000,
                position: 'top-right',
            })
            navigate('/', { replace: true })
        } else if (error || validationErrors) {
            const { title, message, action } = handleError()
            toast.error(message, {
                duration: 5000,
                position: 'top-right',
            })
            setTimeout(() => {
                navigate(action, { replace: true })
            }, 100)
        }
    }, [navigate])

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center gap-4">
                    <Spinner />
                    <h2 className="text-xl font-semibold text-gray-900">
                        Processing Authentication
                    </h2>
                    <p className="text-gray-600 text-center">
                        Please wait while we verify your Google account...
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/auth/login')}
                        className="mt-4"
                    >
                        Return to Sign In
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GoogleCallback
