import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import SignUpImage from "@/assets/images/auth/SignUp-UI-image.svg"
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SignUpFormSchema } from "@/schemas"
import { useState } from "react"
import Spinner from "@/components/Spinner/Spinner.component"



const SignUp: React.FC = () => {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof SignUpFormSchema>) => {
        try {
            console.log(values)

            setTimeout(() => {
                setLoading(false)
            }, 5000)
            // Handle form submission
            // #TODO: Implement form submission (use custom hook)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(true)
        }
    }


    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center p-10 font-inter">
            <div className="w-full max-w-sm">
            <CardHeader>
                <p className="text-blue-600 text-base font-bold leading-6 uppercase">
                OPENCONNECT
                </p>
                <h2 className="text-black text-3xl font-semibold leading-10 tracking-tight">
                Idea Sharing & Collaboration Platform
                </h2>
                <p className="text-zinc-400 text-lg font-semibold leading-7">
                Create your account
                </p>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        <p className="text-left text-zinc-500">
                                Already have an account?
                        <a href="#" className="text-blue-600 hover:underline ml-1">Sign In</a>
                        </p>
                        <Button type="button" variant="outline" className="w-full">
                        <FcGoogle className="mr-2" />
                        Continue with Google
                        </Button>
                        <div className="flex items-center">
                            <Separator className="flex-auto" />
                                <span className="text-zinc-400 text-sm font-semibold mx-2">or</span>
                            <Separator className="flex-auto" />
                        </div>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
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
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="text-sm">
                            <span className="text-zinc-400">By signing up, you agree to our</span>
                            <a href="#" className="text-blue-600 hover:underline"> Terms of Service</a>
                            <span className="text-zinc-400"> and</span>
                            <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>.
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full rounded-md bg-blue-600 hover:bg-blue-700">
                            {loading ? <Spinner /> : 'Sign Up'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
            </div>
        </div>
        <div className="hidden md:flex items-center justify-center px-10">
            <div className="w-4/5 h-4/5 flex items-center justify-center">
            <img src={SignUpImage} alt="Student Sign Up" />
            </div>
        </div>
        </div>
    )
}

export default SignUp
