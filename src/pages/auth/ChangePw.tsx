import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ChangePwImage from '@/assets/images/auth/ChangePw-UI-image.svg'
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
import { ChangePasswordSchema } from '@/schemas'
import { useState } from 'react'
import Spinner from '@/components/Spinner/Spinner.component'

export const ChangePw: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (values: {
        newPassword: string
        confirmPassword: string
    }) => {
        setLoading(true)
        setTimeout(() => {
            console.log(values)
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center font-inter">
                <div className="w-full max-w-sm p-4">
                    <div className="pb-10">
                        <p className="text-blue-600 text-base font-bold uppercase">
                            OPENCONNECT
                        </p>
                        <h2 className="text-black text-3xl font-semibold tracking-tight">
                            Idea Sharing & Collaboration Platform
                        </h2>
                        <p className="text-zinc-400 text-lg font-semibold">
                            Change Password
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-10 py-10">
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    New Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="Enter New Password"
                                                        autoComplete="new-password"
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
                                                        {...field}
                                                        type="password"
                                                        placeholder="Enter New Password Again"
                                                        autoComplete="new-password"
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
                                    {loading ? <Spinner /> : 'Change Password'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="hidden md:flex items-center justify-center px-10">
                <div className="w-4/5 h-4/5 flex items-center justify-center">
                    <img src={ChangePwImage} alt="Change Password" />
                </div>
            </div>
        </div>
    )
}
