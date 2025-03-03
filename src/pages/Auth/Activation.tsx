import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useActivation } from '@/hooks/useActivation'
import Spinner from '@/components/Spinner/Spinner.component'

const Activation = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const { activateUser, isLoading, isError, error } = useActivation()

    useEffect(() => {
        if (token) {
            activateUser(token)
        }
    }, [token, activateUser])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full border border-blue-100">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                    <p className="mt-4 text-blue-800 font-medium">
                        Activating your account...
                    </p>
                    <p className="mt-2 text-blue-500 text-sm">
                        Please wait while we verify your details
                    </p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full border border-blue-100">
                    <div className="flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-blue-900">
                        Activation Failed
                    </h2>
                    <p className="mt-2 text-blue-800">
                        {error?.message || 'An unexpected error occurred'}
                    </p>
                    <button
                        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
                        onClick={() => (window.location.href = '/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    // Success state
    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full border border-blue-100">
                <div className="flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="mt-4 text-xl font-bold text-blue-900">
                    Account Activated!
                </h2>
                <p className="mt-2 text-blue-700">
                    Your account has been successfully activated.
                </p>
                <button
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
                    onClick={() => (window.location.href = '/auth/login')}
                >
                    Login Now
                </button>
            </div>
        </div>
    )
}

export default Activation
