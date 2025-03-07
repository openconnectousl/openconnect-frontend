import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProfileOnboardingData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowRight, Upload, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface BasicInfoStepProps {
    formData: ProfileOnboardingData
    updateFormData: (data: Partial<ProfileOnboardingData>) => void
    nextStep: () => void
}

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

const basicInfoSchema = z.object({
    firstname: z.string().min(2, 'First name must be at least 2 characters'),
    lastname: z.string().min(2, 'Last name must be at least 2 characters'),
    title: z.string().min(2, 'Professional title is required'),
    mobile: z.string().optional(),
    bio: z
        .string()
        .min(10, 'Please write at least a brief introduction')
        .max(300, 'Bio cannot exceed 300 characters')
        .optional(),
    avatar: z.union([
        z
            .instanceof(File)
            .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
                message: `Max file size is 5MB.`,
            })
            .refine(
                (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
                {
                    message:
                        'Only .jpg, .jpeg, .png and .webp files are accepted.',
                }
            ),
        z.undefined(),
    ]),
})

export function BasicInfoStep({
    formData,
    updateFormData,
    nextStep,
}: BasicInfoStepProps) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(() => {
        // If formData.avatar exists and is a File, create an object URL for preview
        if (formData.avatar instanceof File) {
            return URL.createObjectURL(formData.avatar)
        }
        // Otherwise, use whatever string value is in formData.avatar or null
        return typeof formData.avatar === 'string' ? formData.avatar : null
    })

    useEffect(() => {
        return () => {
            // If avatarPreview is a blob URL, revoke it when the component unmounts
            if (avatarPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview)
            }
        }
    }, [])
    const form = useForm<z.infer<typeof basicInfoSchema>>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            firstname: formData.firstname || '',
            lastname: formData.lastname || '',
            title: formData.title || '',
            mobile: formData.mobile || '',
            bio: formData.bio || '',
        },
    })

    // Clear the selected image
    const clearAvatar = () => {
        setAvatarPreview(null)
        form.setValue('avatar', undefined)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Create a preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)

            // Also set the file in the form
            form.setValue('avatar', file)
        }
    }
    async function onSubmit(values: z.infer<typeof basicInfoSchema>) {
        // Start with null (will become undefined when sent to backend)
        let avatarData: string | undefined = undefined

        // If we have an avatar preview, use it
        if (avatarPreview) {
            // If the preview is already a data URL, we need to extract just the base64 part
            if (avatarPreview.startsWith('data:')) {
                // Extract the base64 part by removing the data URL prefix
                avatarData = avatarPreview.split(',')[1] // Get the part after the comma
            } else if (values.avatar instanceof File) {
                // If it's a file, read it as base64
                const reader = new FileReader()
                avatarData = await new Promise((resolve) => {
                    reader.onloadend = () => {
                        // Extract the base64 part of the data URL
                        const base64String = reader.result as string
                        resolve(base64String.split(',')[1])
                    }
                    reader.readAsDataURL(values.avatar as File)
                })
            }
        }

        // Update form data with all values including avatar base64 string
        updateFormData({
            ...values,
            avatar: avatarData,
        })

        nextStep()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-2 border-dashed border-gray-300 cursor-pointer group">
                            {avatarPreview ? (
                                <>
                                    <AvatarImage
                                        src={avatarPreview}
                                        alt="Profile"
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={clearAvatar}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <AvatarFallback className="bg-gray-100 text-gray-400 flex flex-col items-center justify-center">
                                    <Upload size={24} />
                                    <span className="text-xs mt-1">Upload</span>
                                </AvatarFallback>
                            )}
                        </Avatar>

                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({
                                field: { onChange, value, ...rest },
                            }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="avatar-upload"
                                            onChange={(e) => {
                                                handleFileChange(e)
                                            }}
                                            {...rest}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <label
                            htmlFor="avatar-upload"
                            className="absolute inset-0 cursor-pointer rounded-full"
                        >
                            <span className="sr-only">
                                Upload profile picture
                            </span>
                        </label>
                    </div>
                </div>
                <p className="text-center text-sm text-gray-500 -mt-4 mb-4">
                    Upload a profile picture (optional)
                </p>

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your first name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your last name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Professional Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Software Engineer, Student, Professor"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your contact number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About Me</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell others a bit about yourself..."
                                        className="min-h-[120px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" className="flex items-center">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    )
}
