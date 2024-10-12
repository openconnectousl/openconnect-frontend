import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import VerifyImage from '@/assets/images/auth/Verfiy-UI-image.svg'
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
import { VerificationFormSchema } from '@/schemas'
import { useState } from 'react'
import Spinner from '@/components/Spinner/Spinner.component'

const Verification: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(VerificationFormSchema),
        defaultValues: {
            verificationCode: '',
        },
    })

    const onSubmit = (values: { verificationCode: string }) => {
        try {
            console.log(values)

            setTimeout(() => {
                setLoading(false)
            }, 1000)
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
                            One time verification
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-10 py-10">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="verificationCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Verification Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="***************************"
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
                                    className="w-full rounded-md bg-blue-600 hover:bg-blue-700"
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
                    <img src={VerifyImage} alt="Verification" />
                </div>
            </div>
        </div>
    )
}

export default Verification
