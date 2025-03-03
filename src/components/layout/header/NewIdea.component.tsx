import React, { useRef, useState } from 'react'
import { Github, Loader2, Plus, X } from 'lucide-react'
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

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    url: z.string().optional(),
    description: z
        .string()
        .min(10, 'Description should be at least 10 characters'),
    category: z.string().min(1, 'Please select a category'),
    tags: z.array(z.string()),
    learningOutcome: z.string().min(10, 'Please share what you learned'),
    recommendedLevel: z.enum(['beginner', 'intermediate', 'advanced']),
    generalThoughts: z.string().optional(),
    pdfFile: z.union([z.instanceof(File), z.null()]).optional(),
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
    const [newTag, setNewTag] = React.useState<string>('')
    const [isFetching, setIsFetching] = React.useState(false)
    const [, setFetchError] = React.useState<string>('')

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            url: '',
            description: '',
            category: '',
            tags: [],
            learningOutcome: '',
            recommendedLevel: 'beginner',
            generalThoughts: '',
            pdfFile: null,
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

            console.log(metadata)
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
            setNewTag('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(updatedTags)
    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setSelectedFile(file)
    }

    const removeFile = () => {
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] bg-white p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 text-2xl font-semibold pb-4">
                        New Idea Submission
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-900 font-medium">
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Idea title"
                                            className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-900 font-medium">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Idea description..."
                                                    className="min-h-[120px] border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-900 font-medium">
                                                Category
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="border-gray-300 focus:ring-blue-600">
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
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />

                                {/* PDF Upload */}
                                <div className="space-y-4">
                                    <FormLabel className="text-gray-900 font-medium">
                                        Upload PDF (Optional)
                                    </FormLabel>
                                    <div className="relative w-full">
                                        <Input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="border-gray-300 text-gray-500 focus:border-blue-600 focus:ring-blue-600 pr-10 pl-1 h-8"
                                        />

                                        {selectedFile && (
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 mx-1 text-gray-600 hover:text-red-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                    <FormMessage className="text-red-600" />
                                </div>
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-900 font-medium">
                                        Resource URL(Github)
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Github className="absolute left-3 top-3 h-4 w-4 text-gray-600" />
                                            <Input
                                                placeholder="https://"
                                                className="pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                                                {...field}
                                            />
                                            {isFetching && (
                                                <div className="absolute right-3 top-3">
                                                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        {/* Tags Section */}
                        <div className="space-y-2">
                            <FormLabel className="text-gray-900 font-medium">
                                Tags
                            </FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-red-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag"
                                    className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                                    onKeyPress={(e) =>
                                        e.key === 'Enter' &&
                                        (e.preventDefault(), addTag())
                                    }
                                />
                                <Button
                                    type="button"
                                    onClick={addTag}
                                    variant="outline"
                                    className="border-gray-300 hover:bg-gray-100 text-blue-600"
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>
                        </div>

                        {/* Learning Outcome & General Thoughts Section */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="learningOutcome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-900 font-medium">
                                            What did you learn?
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="E.g., Learned the basics of React hooks"
                                                className="min-h-[100px] border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="generalThoughts"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-900 font-medium">
                                            General Thoughts (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Share any additional thoughts about this idea..."
                                                className="min-h-[100px] border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600" />
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
                                className="border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100"
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
