import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SignUpImage from '@/assets/images/auth/SignUpImage.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { SignUpFormSchema } from '@/schemas'
import Spinner from '@/components/Spinner/Spinner.component'
import { useSignUp } from '@/hooks/useSignUp'
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import SuccessMessage from '@/components/common/SuccessMessage'
import { useNavigate } from 'react-router-dom'
import { useGoogleAuth } from '@/hooks/useGoogleOAuth'

const SignUp: React.FC = () => {
    const { signUp, isLoading, isError, error, isSuccess } = useSignUp()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showExistingAccountMessage, setShowExistingAccountMessage] =
        useState(false)
    const { googleSignIn, isLoading: isGoogleLoading } = useGoogleAuth()
    const [existingEmail, setExistingEmail] = useState('')
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
    }

    const form = useForm({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
        },
    })

    const onSubmit = async (values: {
        email: string
        username: string
        password: string
    }) => {
        await signUp({
            email: values.email,
            username: values.username,
            password: values.password,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            form.reset()
            setShowSuccessMessage(true)
        }
    }, [isSuccess, form])

    useEffect(() => {
        if (isError && error?.error?.email) {
            const emailError = error.error.email
            const isEmailExistsError =
                (typeof emailError === 'string' &&
                    emailError.includes('already exists')) ||
                (Array.isArray(emailError) &&
                    emailError.some((msg) => msg.includes('already exists')))

            if (isEmailExistsError) {
                setExistingEmail(form.getValues('email'))
                setShowExistingAccountMessage(true)
                form.setError('email', {
                    type: 'manual',
                    message: 'An account with this email already exists',
                })
            }
        }
    }, [isError, error, form])

    return (
        <>
            <SuccessMessage
                isOpen={showSuccessMessage}
                onClose={() => {
                    setShowSuccessMessage(false)
                    navigate('/')
                }}
                title="Sign Up Successful!"
                description=""
            />
            <SuccessMessage
                isOpen={showExistingAccountMessage}
                onClose={() => {
                    setShowExistingAccountMessage(false)
                    navigate('/auth/login')
                }}
                title="Account Already Exists"
                description="Would you like to sign in instead?"
                email={existingEmail}
            />
            <div className="h-screen grid grid-cols-1 md:grid-cols-2">
                <div className="flex items-center justify-center gap-10 font-inter">
                    <div className="w-full max-w-sm p-4">
                        <div className="gap-1 pb-10">
                            <p className="text-blue-600 text-base font-bold leading-6 uppercase">
                                OPENCONNECT
                            </p>
                            <h2 className="text-black text-3xl font-semibold leading-10 tracking-tight">
                                Idea Sharing & Collaboration Platform
                            </h2>
                            <p className="text-zinc-400 text-lg font-semibold leading-7">
                                Create your account
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-6">
                                    <p className="text-left text-zinc-500">
                                        Already have an account?
                                        <a
                                            href="/auth/login"
                                            className="text-blue-600 hover:underline ml-1"
                                        >
                                            Sign In
                                        </a>
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleGoogleSignIn}
                                        disabled={isGoogleLoading}
                                    >
                                        {isGoogleLoading ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                <FcGoogle className="mr-2" />
                                                Continue with Google
                                            </>
                                        )}
                                    </Button>
                                    <div className="flex items-center">
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <span className="flex-shrink mx-4 text-gray-400">
                                            or
                                        </span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="username"
                                                        placeholder="Enter your Username"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="text-sm">
                                        <span className="text-zinc-400">
                                            By signing up, you agree to our
                                        </span>
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {' '}
                                            Terms of Service
                                        </a>
                                        <span className="text-zinc-400">
                                            {' '}
                                            and
                                        </span>
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {' '}
                                            Privacy Policy
                                        </a>
                                        .
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button
                                        type="submit"
                                        className="w-full rounded-md bg-blue-600 hover:bg-blue-700"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner />
                                                <span className="ml-2">
                                                    Signing up...
                                                </span>
                                            </div>
                                        ) : (
                                            'Sign Up'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="relative hidden md:flex items-center justify-center px-10">
                    <div className="w-4/5 h-4/5 flex items-center justify-center">
                        <img src={SignUpImage} alt="Student Sign Up" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
