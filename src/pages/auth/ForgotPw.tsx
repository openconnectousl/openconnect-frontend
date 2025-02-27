import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ForgotPwImage from '@/assets/images/auth/ForgotPw-UI-image.svg'
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
import { ForgotPwFormSchema } from '@/schemas'
import { useState } from 'react'
import Spinner from '@/components/Spinner/Spinner.component'
import { ArrowLeft } from 'lucide-react'

export const ForgotPw: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(ForgotPwFormSchema),
        defaultValues: {
            userEmail: '',
        },
    })

    const onSubmit = (values: { userEmail: string }) => {
        try {
            console.log(values)

            setTimeout(() => {
                setLoading(false)
            }, 1000)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(true)
        }
    }

    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center gap-10 font-inter">
                <div className="w-[402px] max-w-sm p-4">
                    <Button
                        variant="link"
                        className="pl-0 py-10 text-black font-semibold text-xs items-center hover:text-blue-800"
                    >
                        <ArrowLeft />
                        Back to Login
                    </Button>
                    <div className="gap-1 pb-10">
                        <p className="text-blue-600 text-base font-bold leading-6 uppercase">
                            OPENCONNECT
                        </p>
                        <h2 className="text-black text-3xl font-semibold leading-10 tracking-tight">
                            Idea Sharing & Collaboration Platform
                        </h2>
                        <p className="text-zinc-400 text-lg font-semibold leading-7">
                            Forgot password?
                        </p>
                    </div>

                    <div className="flex flex-col items-start pt-10">
                        <p className="text-base font-medium">
                            It looks like you’ve forgotten your password.
                        </p>
                        <p className="text-neutral-500 font-inter text-sm font-normal leading-6">
                            Enter your Email Address and we'll send you an email
                            that will allow you to reset your password.
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-10 py-10">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="userEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter Your Email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full rounded-md"
                                >
                                    {loading ? <Spinner /> : 'Continue'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="relative hidden md:flex items-center justify-center px-10">
                <div className="w-4/5 h-4/5 flex items-center justify-center">
                    <img src={ForgotPwImage} alt="Forgot Password" />
                </div>
            </div>
        </div>
    )
}
