import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination'
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Edit,
    FilterIcon,
    Link,
} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Label } from '../ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface Idea {
    id: number
    title: string
    description: string
    author: { name: string; image: string }
    category: string
    tags: string[]
    learningOutcome: string
    recommendedLevel: string
    generalThoughts?: string
    pdfUrl?: string
    url?: string
    date: string
    status: 'Pending' | 'Approved' | 'Rejected'
    feedback?: string
}

type ReviewAction = 'Approved' | 'Rejected' | 'Pending'

const ideasData: Idea[] = [
    {
        id: 1,
        title: 'AI Chatbot',
        description: 'An AI chatbot for customer support.',
        author: { name: 'John Doe', image: '/avatars/john.png' },
        category: 'Technology',
        tags: ['AI', 'Chatbot'],
        learningOutcome: 'Enhancing customer support automation',
        recommendedLevel: 'Intermediate',
        date: 'Feb 15, 2025',
        status: 'Approved',
    },
    {
        id: 2,
        title: 'Dark Mode Feature',
        description: 'Adding dark mode to the platform.',
        author: { name: 'Jane Smith', image: '/avatars/jane.png' },
        category: 'UI/UX',
        tags: ['Dark Mode', 'User Experience'],
        learningOutcome: 'Improving user experience',
        recommendedLevel: 'Beginner',
        date: 'Feb 20, 2025',
        status: 'Approved',
    },
    {
        id: 3,
        title: 'Blockchain Voting System',
        description:
            'A secure voting system using blockchain to prevent fraud and ensure transparency.',
        author: { name: 'Alice Brown', image: '/avatars/alice.png' },
        category: 'Blockchain',
        tags: [
            'Blockchain',
            'Security',
            'Voting',
            'Decentralization',
            'Transparency',
            'Smart Contracts',
        ],
        learningOutcome: 'Understanding decentralized security in elections',
        recommendedLevel: 'Advanced',
        date: 'Feb 20, 2025',
        status: 'Rejected',
    },
    {
        id: 4,
        title: 'Smart Traffic Management',
        description:
            'A system that utilizes AI to analyze traffic patterns and optimize signal timings.',
        author: { name: 'Bob Martin', image: '/avatars/bob.png' },
        category: 'AI & Automation',
        tags: ['Traffic', 'AI', 'Automation'],
        learningOutcome: 'Enhancing urban traffic management using AI',
        recommendedLevel: 'Intermediate',
        date: 'Feb 25, 2025',
        status: 'Approved',
    },
    {
        id: 5,
        title: 'E-Learning Mobile App',
        description: `A mobile application designed to provide interactive learning experiences, quizzes, and real-time feedback to students.
                      This app will integrate AI-based personalized learning paths and gamification elements to make learning more engaging.`,
        author: { name: 'Chris White', image: '/avatars/chris.png' },
        category: 'Education Technology',
        tags: ['E-Learning', 'AI', 'Mobile App'],
        learningOutcome: 'Understanding adaptive learning technologies',
        recommendedLevel: 'Intermediate',
        date: 'Feb 27, 2025',
        status: 'Rejected',
    },
    {
        id: 6,
        title: 'IoT-based Smart Farming',
        description: `The project aims to implement an IoT-based monitoring system for precision farming.
                      It will include real-time soil moisture detection, automated irrigation control, and AI-driven crop health analytics.
                      Farmers can access data via a mobile dashboard to make informed decisions on irrigation and fertilizer usage.`,
        author: { name: 'Emma Wilson', image: '/avatars/emma.png' },
        category: 'IoT & Agriculture',
        tags: ['IoT', 'Farming', 'Smart Agriculture'],
        learningOutcome: 'Applying IoT for precision farming',
        recommendedLevel: 'Advanced',
        date: 'March 1, 2025',
        status: 'Pending',
    },
    {
        id: 7,
        title: 'Fitness Tracker with AI Coaching',
        description:
            'A fitness tracker app that provides AI-generated workout plans based on user activity and health data.',
        author: { name: 'David Scott', image: '/avatars/david.png' },
        category: 'Health & Fitness',
        tags: ['Fitness', 'AI', 'Wearable'],
        learningOutcome: 'Enhancing personal fitness with AI-driven coaching',
        recommendedLevel: 'Beginner',
        date: 'March 3, 2025',
        status: 'Pending',
    },
    {
        id: 8,
        title: 'E-Waste Management Platform',
        description:
            'An online platform that connects users to e-waste recycling centers and tracks e-waste disposal.',
        author: { name: 'Sophia Green', image: '/avatars/sophia.png' },
        category: 'Environment',
        tags: ['Recycling', 'E-Waste', 'Sustainability'],
        learningOutcome: 'Promoting responsible e-waste disposal',
        recommendedLevel: 'Intermediate',
        date: 'March 3, 2025',
        status: 'Pending',
    },
]

const AdminPanelIdeas: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>(ideasData)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
    const [feedback, setFeedback] = useState('')

    const [search, setSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    useEffect(() => {
        let filtered = ideasData

        // Filter ideas by search term
        if (search) {
            filtered = filtered.filter((idea) =>
                idea.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        // Filter ideas by status
        if (selectedStatus) {
            filtered = filtered.filter((idea) => idea.status === selectedStatus)
        }

        setIdeas(filtered)
        setCurrentPage(1)
    }, [search, selectedStatus, ideasData])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status)
    }
    const handleRemoveFilter = () => {
        setSelectedStatus(null)
        setIdeas(ideasData)
    }
    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(ideas.length / rowsPerPage))
    const startIndex = (currentPage - 1) * rowsPerPage
    const displayedIdeas = ideas.slice(startIndex, startIndex + rowsPerPage)

    const handleReview = (idea: Idea) => {
        setSelectedIdea(idea)
        setFeedback('')
    }

    const editFeedback = (idea: Idea) => {
        setSelectedIdea(idea)
        setFeedback(idea.feedback || '')
    }

    const handleAction = (action: ReviewAction) => {
        if (!selectedIdea) return

        setIdeas((prevIdeas) =>
            prevIdeas.map((idea) =>
                idea.id === selectedIdea.id ? { ...idea, status: action } : idea
            )
        )
        setSelectedIdea(null)
    }

    const handleSaveFeedback = () => {
        if (!selectedIdea) return

        setIdeas((prevIdeas) =>
            prevIdeas.map((idea) =>
                idea.id === selectedIdea.id
                    ? { ...idea, feedback: feedback }
                    : idea
            )
        )
        setSelectedIdea({ ...selectedIdea, feedback })
        setFeedback('')
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Submitted Ideas</h2>
            <Card className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b px-1 py-4 mb-6 ">
                    <Input
                        placeholder="Search ideas by title..."
                        value={search}
                        onChange={handleSearch}
                        className="sm:w-80 w-full h-8"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline3"
                                className="flex items-center border-dashed h-8"
                            >
                                <FilterIcon />
                                <span>
                                    {selectedStatus ? selectedStatus : 'Status'}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                className="text-gray-800 font-medium"
                                onClick={() => handleStatusSelect('Pending')}
                            >
                                Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-green-800 font-medium"
                                onClick={() => handleStatusSelect('Approved')}
                            >
                                Approved
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-800 font-medium"
                                onClick={() => handleStatusSelect('Rejected')}
                            >
                                Rejected
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedStatus && (
                        <Button
                            variant="outline3"
                            className="border-dashed h-8"
                            onClick={handleRemoveFilter}
                        >
                            Remove Filter
                        </Button>
                    )}
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-400">No.</TableHead>
                            <TableHead className="text-gray-400">
                                Title
                            </TableHead>
                            <TableHead className="text-gray-400">
                                Category
                            </TableHead>
                            <TableHead className="text-gray-400">
                                Submitted by
                            </TableHead>
                            <TableHead className="text-gray-400">
                                Date
                            </TableHead>
                            <TableHead className="text-gray-400">
                                Status
                            </TableHead>
                            <TableHead className="text-gray-400">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedIdeas.map((idea) => (
                            <TableRow key={idea.id}>
                                <TableCell className=" font-medium">
                                    {idea.id}
                                </TableCell>
                                <TableCell className=" font-medium">
                                    {idea.title}
                                </TableCell>
                                <TableCell className="">
                                    {idea.category}
                                </TableCell>
                                <TableCell className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-1">
                                        <AvatarImage
                                            src={idea.author.image}
                                            alt={idea.author.name}
                                        />
                                        <AvatarFallback className="text-xs">
                                            {idea.author.name[0]}
                                        </AvatarFallback>
                                    </Avatar>{' '}
                                    {idea.author.name}
                                </TableCell>
                                <TableCell className="">{idea.date}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            idea.status === 'Approved'
                                                ? 'default2'
                                                : idea.status === 'Rejected'
                                                  ? 'destructive2'
                                                  : 'secondary'
                                        }
                                    >
                                        {idea.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-blue-600 hover:text-blue-700"
                                        onClick={() => handleReview(idea)}
                                    >
                                        Review
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Review section */}
                {selectedIdea && (
                    <Dialog
                        open={true}
                        onOpenChange={() => setSelectedIdea(null)}
                    >
                        <DialogContent className="sm:max-w-[700px] bg-white p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
                            <DialogHeader>
                                <DialogTitle className="text-gray-900 text-2xl font-semibold pb-4">
                                    {selectedIdea?.title}
                                    <Separator className="mt-2 h-0.5 rounded-full bg-slate-100" />
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-gray-700 mb-2">
                                <strong>Category:</strong>{' '}
                                {selectedIdea?.category}
                            </p>
                            <Separator />

                            <p className="text-gray-800 mt-4 mb-2 font-bold">
                                Description
                            </p>
                            <p className="text-gray-600">
                                {selectedIdea?.description}
                            </p>

                            <Separator />

                            <>
                                <p className="flex items-center gap-4 text-gray-800 mt-4 font-bold">
                                    Uploaded PDF
                                </p>
                                {selectedIdea?.pdfUrl ? (
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            window.open(
                                                selectedIdea?.pdfUrl,
                                                '_blank'
                                            )
                                        }
                                        className="flex items-center gap-2 w-full sm:w-36"
                                    >
                                        <Download size={16} /> Download PDF
                                    </Button>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">
                                        No PDF available
                                    </p>
                                )}
                            </>
                            <Separator />

                            <>
                                <p className="text-gray-800 mt-4 font-bold">
                                    Resource URL(Github)
                                </p>
                                {selectedIdea?.url ? (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            window.open(
                                                selectedIdea?.url,
                                                '_blank'
                                            )
                                        }
                                        className="flex items-center gap-2 w-full sm:w-36 font-semibold"
                                    >
                                        <Link />
                                        Open URL
                                    </Button>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">
                                        No Resource URL available
                                    </p>
                                )}
                            </>

                            <Separator />

                            <p className="text-gray-800 mt-4 mb-2 font-bold">
                                What was learned?
                            </p>
                            <p className="text-gray-600">
                                {selectedIdea?.learningOutcome}
                            </p>

                            {selectedIdea?.generalThoughts && (
                                <>
                                    <Separator />
                                    <p className="text-gray-800 mt-4 mb-2 font-bold">
                                        General Thoughts
                                    </p>
                                    <p className="text-gray-600">
                                        {selectedIdea?.generalThoughts}
                                    </p>
                                </>
                            )}

                            <Separator />

                            <div className="mt-4">
                                <p className="text-gray-800 mb-6 font-bold">
                                    Tags
                                </p>
                                <div className="flex flex-wrap gap-4 mt-1">
                                    {selectedIdea?.tags.length > 0 ? (
                                        selectedIdea?.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                className="bg-muted text-gray-600 text-xs hover:bg-slate-100 hover:text-gray-600"
                                            >
                                                {tag}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-xs italic">
                                            No tags available
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Separator className="my-4" />

                            <p className="text-gray-800 font-bold">Feedback</p>

                            {selectedIdea.feedback ? (
                                <div className="text-gray-600 bg-gray-50 text-xs border p-4 rounded-md flex flex-row justify-between items-center">
                                    <p>{selectedIdea.feedback}</p>
                                    <div className="border-gray-400 border-l h-full ml-4 items-center">
                                        <Button
                                            variant="link"
                                            className="text-black hover:text-blue-700"
                                            onClick={() =>
                                                editFeedback(selectedIdea)
                                            }
                                        >
                                            <Edit />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400  text-xs italic">
                                    No feedback provided yet.
                                </p>
                            )}

                            <Separator className="my-4" />

                            <Textarea
                                placeholder="Provide feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <Button
                                className="mt-2 hover:bg-slate-300/50 border-blue-600 border"
                                variant="secondary"
                                size="sm"
                                onClick={handleSaveFeedback}
                            >
                                Save Feedback
                            </Button>
                            <DialogFooter className="mt-6 flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAction('Rejected')}
                                >
                                    Reject
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="hover:bg-slate-300/50 border-gray-600 border"
                                    onClick={() => handleAction('Pending')}
                                >
                                    Request Changes
                                </Button>
                                <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleAction('Approved')}
                                >
                                    Approve
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row border-t-2 justify-between sm:gap-0 gap-4 items-center p-2 pt-4 mt-6">
                    <span className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">
                            {displayedIdeas.length}
                        </span>{' '}
                        of{' '}
                        <span className="font-semibold text-gray-700">
                            {ideasData.length}
                        </span>{' '}
                        submission(s)
                    </span>
                    <div className="flex items-center space-x-8">
                        <Select
                            onValueChange={(value) =>
                                setRowsPerPage(Number(value))
                            }
                            value={String(rowsPerPage)}
                        >
                            <div className="flex items-center space-x-2">
                                <Label
                                    className="text-xs font-semibold"
                                    htmlFor="rows-per-page"
                                >
                                    Rows per page
                                </Label>
                                <SelectTrigger
                                    id="rows-per-page"
                                    className="w-[60px] h-6 text-xs"
                                >
                                    <SelectValue placeholder="Rows per page" />
                                </SelectTrigger>
                            </div>
                            <SelectContent>
                                <SelectItem className="text-xs" value="10">
                                    10
                                </SelectItem>
                                <SelectItem className="text-xs" value="15">
                                    15
                                </SelectItem>
                                <SelectItem className="text-xs" value="20">
                                    20
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <span className="text-xs font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex space-x-3">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <Button
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            variant="outline3"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(prev - 1, 1)
                                                )
                                            }
                                        >
                                            <ChevronLeft strokeWidth={2.5} />
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            variant="outline3"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        prev + 1,
                                                        totalPages
                                                    )
                                                )
                                            }
                                        >
                                            <ChevronRight strokeWidth={2.5} />
                                        </Button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AdminPanelIdeas
