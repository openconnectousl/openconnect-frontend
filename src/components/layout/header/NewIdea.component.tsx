import React from 'react'
import { Plus, Link as LinkIcon, X, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    url: z.string().url('Please enter a valid URL'),
    description: z
        .string()
        .min(10, 'Description should be at least 10 characters'),
    category: z.string().min(1, 'Please select a category'),
    tags: z.array(z.string()),
    prerequisites: z.array(z.string()),
    rating: z.number().min(1).max(5),
    learningOutcome: z.string().min(10, 'Please share what you learned'),
    recommendedLevel: z.enum(['beginner', 'intermediate', 'advanced']),
    generalThoughts: z.string().optional(),
    imageUrl: z.string().optional(),
    platform: z.string().optional(),
})

interface NewIdeaModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const NewIdea: React.FC<NewIdeaModalProps> = ({
    open,
    onOpenChange,
}) => {
    const [tags, setTags] = React.useState<string[]>([])
    const [prerequisites, setPrerequisites] = React.useState<string[]>([])
    const [newTag, setNewTag] = React.useState<string>('')
    const [newPrerequisite, setNewPrerequisite] = React.useState<string>('')
    const [rating, setRating] = React.useState(0)
    const [isFetching, setIsFetching] = React.useState(false)
    const [fetchError, setFetchError] = React.useState<string>('')

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            url: '',
            description: '',
            category: '',
            tags: [],
            prerequisites: [],
            rating: 0,
            learningOutcome: '',
            recommendedLevel: 'beginner',
            generalThoughts: '',
            imageUrl: '',
            platform: '',
        },
    })

    const fetchResourceMetadata = async (url: string) => {
        if (!url) return

        setIsFetching(true)
        setFetchError('')

        try {
            const response = await fetch(
                `http://localhost:3001/api/fetchMetaData?url=${encodeURIComponent(
                    url
                )}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Failed to fetch resource details')
            }

            const metadata = await response.json()

            form.setValue('title', metadata.title)
            form.setValue('description', metadata.description)
            form.setValue('imageUrl', metadata.image)

            console.log(metadata)

            let platform = 'Website'

            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                platform = 'YouTube'
            } else if (url.includes('github.com')) {
                platform = 'GitHub'
            }
            form.setValue('platform', platform)
        } catch (error) {
            setFetchError(
                'Failed to fetch resource details. You can enter them manually.'
            )
            console.error('Failed to fetch resource details', error)
        } finally {
            setIsFetching(false)
        }
    }

    React.useEffect(() => {
        const url = form.watch('url')
        if (url && url.startsWith('http')) {
            fetchResourceMetadata(url)
        }
    }, [form.watch('url')])

    const onSubmit = () => {
        console.log('submitted', form.getValues())
        onOpenChange(false)
    }

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag])
            // form.setValue('tags', [...tags, newTag]);
            setNewTag('')
        }
    }

    const addPrerequisite = () => {
        if (newPrerequisite && !prerequisites.includes(newPrerequisite)) {
            setPrerequisites([...prerequisites, newPrerequisite])
            // form.setValue('prerequisites', [...prerequisites, newPrerequisite]);
            setNewPrerequisite('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(updatedTags)
        // form.setValue('tags', updatedTags);
    }

    const removePrerequisite = (prereqToRemove: string) => {
        const updatedPrerequisites = prerequisites.filter(
            (prereq) => prereq !== prereqToRemove
        )
        setPrerequisites(updatedPrerequisites)
        // form.setValue('prerequisites', updatedPrerequisites);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] bg-white font-['Roboto'] p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-[#212529] text-2xl font-semibold">
                        Share New Idea
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* URL Section with Auto-fetch Indicator */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#212529] font-medium">
                                            URL
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-[#6C757D]" />
                                                <Input
                                                    placeholder="https://"
                                                    className="pl-10 border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                                    {...field}
                                                />
                                                {isFetching && (
                                                    <div className="absolute right-3 top-3">
                                                        <Loader2 className="h-4 w-4 animate-spin text-[#007BFF]" />
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[#DC3545]" />
                                    </FormItem>
                                )}
                            />

                            {fetchError && (
                                <Alert
                                    variant="destructive"
                                    className="bg-red-50 text-red-800 border-red-200"
                                >
                                    <AlertDescription>
                                        {fetchError}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                        {/* Resource Details Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#212529] font-medium">
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Idea title"
                                                    className="border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[#DC3545]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#212529] font-medium">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Idea description..."
                                                    className="min-h-[120px] border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[#DC3545]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="platform"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#212529] font-medium">
                                                Platform
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Platform"
                                                    className="border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                                    {...field}
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[#DC3545]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#212529] font-medium">
                                                Preview Image
                                            </FormLabel>
                                            <div className="border rounded-lg overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
                                                {field.value ? (
                                                    <img
                                                        src={field.value}
                                                        alt="Idea preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-[#6C757D] text-sm">
                                                        No image available
                                                    </div>
                                                )}
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#212529] font-medium">
                                                Category
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="border-[#DEE2E6] focus:ring-[#007BFF]">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="programming">
                                                        Programming
                                                    </SelectItem>
                                                    <SelectItem value="design">
                                                        Design
                                                    </SelectItem>
                                                    <SelectItem value="business">
                                                        Business
                                                    </SelectItem>
                                                    <SelectItem value="science">
                                                        Science
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[#DC3545]" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Prerequisites Section */}
                        <div className="space-y-2">
                            <FormLabel className="text-[#212529] font-medium">
                                Prerequisites (Optional)
                            </FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {prerequisites.map((prereq) => (
                                    <Badge
                                        key={prereq}
                                        variant="secondary"
                                        className="bg-[#F8F9FA] text-[#495057] hover:bg-[#E9ECEF] flex items-center gap-1"
                                    >
                                        {prereq}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removePrerequisite(prereq)
                                            }
                                            className="ml-1 hover:text-[#DC3545]"
                                        >
                                            <X size={14} />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    value={newPrerequisite}
                                    onChange={(e) =>
                                        setNewPrerequisite(e.target.value)
                                    }
                                    placeholder="Add a prerequisite (e.g., 'Basic HTML', 'JavaScript fundamentals')"
                                    className="border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                    onKeyPress={(e) =>
                                        e.key === 'Enter' &&
                                        (e.preventDefault(), addPrerequisite())
                                    }
                                />
                                <Button
                                    type="button"
                                    onClick={addPrerequisite}
                                    variant="outline"
                                    className="border-[#DEE2E6] hover:bg-[#F8F9FA] text-[#007BFF]"
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>
                        </div>

                        {/* Tags Section */}
                        <div className="space-y-2">
                            <FormLabel className="text-[#212529] font-medium">
                                Tags
                            </FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="bg-[#F8F9FA] text-[#495057] hover:bg-[#E9ECEF] flex items-center gap-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-[#DC3545]"
                                        >
                                            <X size={14} />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag"
                                    className="border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                    onKeyPress={(e) =>
                                        e.key === 'Enter' &&
                                        (e.preventDefault(), addTag())
                                    }
                                />
                                <Button
                                    type="button"
                                    onClick={addTag}
                                    variant="outline"
                                    className="border-[#DEE2E6] hover:bg-[#F8F9FA] text-[#007BFF]"
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>
                        </div>

                        {/* Rating & Level Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#212529] font-medium">
                                            Rate this Idea
                                        </FormLabel>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => {
                                                        setRating(star)
                                                        field.onChange(star)
                                                    }}
                                                    className={`text-2xl ${
                                                        star <= rating
                                                            ? 'text-[#FFC107]'
                                                            : 'text-[#DEE2E6]'
                                                    }`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                        <FormMessage className="text-[#DC3545]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="recommendedLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#212529] font-medium">
                                            Recommended for
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="border-[#DEE2E6] focus:ring-[#007BFF]">
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="beginner">
                                                    Beginner
                                                </SelectItem>
                                                <SelectItem value="intermediate">
                                                    Intermediate
                                                </SelectItem>
                                                <SelectItem value="advanced">
                                                    Advanced
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[#DC3545]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Learning Outcome & General Thoughts Section */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="learningOutcome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#212529] font-medium">
                                            What did you learn?
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="E.g., Learned the basics of React hooks"
                                                className="min-h-[100px] border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[#DC3545]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="generalThoughts"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#212529] font-medium">
                                            General Thoughts (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Share any additional thoughts about this idea..."
                                                className="min-h-[100px] border-[#DEE2E6] focus:border-[#007BFF] focus:ring-[#007BFF]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[#DC3545]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="flex justify-self-center items-center space-x-2">
                            <Button type="submit" className="rounded-lg ">
                                Share Idea
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-[#DEE2E6] rounded-lg text-[#6C757D] hover:bg-[#F8F9FA]"
                            >
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
