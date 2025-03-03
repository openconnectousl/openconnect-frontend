import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFormSchema } from '@/schemas'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/Spinner/Spinner.component'
import SignInImage from '@/assets/images/auth/SignInImage.svg'
import { useSignIn } from '@/hooks/useSignIn.ts'
import { SignInCredentials } from '@/types'
import { useGoogleAuth } from '@/hooks/useGoogleOAuth.ts'

const SignIn: React.FC = () => {
    const { signIn, isLoading } = useSignIn()
    const { googleSignIn, isLoading: isGoogleLoading } = useGoogleAuth()

    const handleGoogleSignIn = () => {
        googleSignIn()
    }
    const form = useForm({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onLogin = async (credentials: SignInCredentials) => {
        signIn(credentials)
    }

    return (
        <>
            <div className="h-screen grid grid-cols-1 md:grid-cols-2">
                {/* details area */}
                <div className="flex items-center justify-center gap-10 font-inter px-36">
                    <div className="w-full max-w-sm p-4">
                        {/* header title */}
                        <div className="gap-1 pb-10">
                            <p className="text-blue-600 text-base font-bold leading-6 uppercase">
                                OPENCONNECT
                            </p>
                            <h2 className="text-black text-3xl font-semibold leading-10 tracking-tight">
                                Idea Sharing & Collaboration Platform
                            </h2>
                            <p className="text-zinc-400 text-lg font-semibold leading-7">
                                Sing in
                            </p>
                        </div>

                        {/* form area*/}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onLogin)}>
                                {/* form header */}
                                <div className="grid git gap-6">
                                    <p className="text-left text-zinc-500">
                                        Dont have an account?
                                        <a
                                            href="/auth/signup"
                                            className="text-blue-600 hover:underline ml-1"
                                        >
                                            Sign Up
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

                                    {/* form fields */}
                                    <div className="flex flex-col gap-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="s12345678@ousl.lk"
                                                            {...field}
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
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="********"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <a
                                            href="/auth/forgot-password"
                                            className="font-medium text-blue-600 hover:underline ml-1 "
                                        >
                                            Forgot Password
                                        </a>
                                    </div>

                                    <div className="mt-2.5">
                                        <Button
                                            type="submit"
                                            className="w-full rounded-md bg-blue-600 hover:bg-blue-700"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <Spinner />
                                            ) : (
                                                'Sign in'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

                {/* image area */}
                <div className="relative hidden md:flex items-center justify-center p-2">
                    <div className="w-4/5 h-4/5 flex items-center justify-center">
                        <img src={SignInImage} alt="Sign in image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
