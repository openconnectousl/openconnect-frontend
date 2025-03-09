import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResetPasswordImage from '@/assets/images/auth/ResetPasswordImage.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner/Spinner.component'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useResetPassword } from '@/hooks/useResetPassword'
import SuccessMessage from '@/components/common/SuccessMessage'
import toast from 'react-hot-toast'

const ResetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(72, 'Password cannot exceed 72 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export const ResetPassword: React.FC = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') || ''
    const { resetPassword, isLoading, isSuccess, isError, error } =
        useResetPassword()
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing reset token')
            navigate('/auth/forgot-password')
        }
    }, [token, navigate])

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessMessage(true)
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError && error) {
            if (error.message?.toLowerCase().includes('expired')) {
                toast.error(
                    'Your password reset link has expired. Please request a new one.'
                )
                setTimeout(() => {
                    navigate('/auth/forgot-password')
                }, 3000)
            } else {
                toast.error(error.message || 'Failed to reset password')
            }
        }
    }, [isError, error, navigate])

    const onSubmit = (values: {
        password: string
        confirmPassword: string
    }) => {
        resetPassword({
            password: values.password,
            token: token,
        })
    }

    return (
        <>
            <SuccessMessage
                isOpen={showSuccessMessage}
                onClose={() => {
                    setShowSuccessMessage(false)
                    navigate('/auth/login')
                }}
                title="Password Reset Successful"
                description=""
                type="passwordResetComplete"
            />

            <div className="h-screen grid grid-cols-1 md:grid-cols-2">
                <div className="flex items-center justify-center gap-10 font-inter">
                    <div className="w-[402px] max-w-sm p-4">
                        <Button
                            variant="link"
                            className="pl-0 py-10 text-black font-semibold text-xs items-center hover:text-blue-800"
                            onClick={() => navigate('/auth/login')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Button>

                        <div className="gap-1 pb-10">
                            <p className="text-blue-600 text-base font-bold leading-6 uppercase">
                                OPENCONNECT
                            </p>
                            <h2 className="text-black text-3xl font-semibold leading-10 tracking-tight">
                                Reset Your Password
                            </h2>
                            <p className="text-zinc-400 text-lg font-semibold leading-7">
                                Create a new secure password
                            </p>
                        </div>

                        <div className="flex flex-col items-start pt-5">
                            <p className="text-neutral-500 font-inter text-sm font-normal leading-6">
                                Please enter your new password below. We
                                recommend using a strong, unique password that
                                you don't use for other websites.
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-6 py-6">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    New Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter new password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm your password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full rounded-md bg-blue-600 hover:bg-blue-700"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner />
                                                <span className="ml-2">
                                                    Resetting password...
                                                </span>
                                            </div>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="relative hidden md:flex items-center justify-center px-10">
                    <div className="w-4/5 h-4/5 flex items-center justify-center">
                        <img src={ResetPasswordImage} alt="Reset Password" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
