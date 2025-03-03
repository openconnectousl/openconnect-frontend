import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ViewIdea } from '@/components/ViewIdea'
import { Badge } from '@/components/ui/badge'
import Header from './header/Header.component'
import { RequestPanel } from '@/components/RequestPanel'
import { useApp } from '@/context/AppContext'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Footer from '../ui/Footer'
import About from '../ui/About'

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
}

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
    },
]

export const ViewOtherUsersIdeas = () => {
    const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false)
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

    const openModal = (idea: Idea) => {
        setSelectedIdea(idea)
        setViewIdeaModalOpen(true)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(6)

    const [search, setSearch] = useState('')
    const [filteredIdeas, setFilteredIdeas] = useState(ideasData)

    useEffect(() => {
        let filtered = ideasData

        // search ideas by title
        if (search) {
            filtered = filtered.filter((idea) =>
                idea.title.toLowerCase().includes(search.toLowerCase())
            )
        }
        setFilteredIdeas(filtered)
    }, [search])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    // Pagination calculations
    const totalPages = Math.max(
        1,
        Math.ceil(filteredIdeas.length / rowsPerPage)
    )
    const startIndex = (currentPage - 1) * rowsPerPage
    const displayedIdeas = filteredIdeas.slice(
        startIndex,
        startIndex + rowsPerPage
    )

    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    return (
        <div className="bg-gray-50">
            <Header
                requests={requests}
                isRequestPanelOpen={isRequestPanelOpen}
                setIsRequestPanelOpen={setIsRequestPanelOpen}
            />
            <RequestPanel
                requests={requests}
                isOpen={isRequestPanelOpen}
                onClose={() => setIsRequestPanelOpen(false)}
            />
            {selectedIdea && (
                <ViewIdea
                    open={viewIdeaModalOpen}
                    onOpenChange={setViewIdeaModalOpen}
                    idea={selectedIdea}
                />
            )}
            <div className="container mx-auto p-6 min-h-screen">
                <div className="sticky top-20 z-20 bg-white shadow-md px-4 py-7 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  mt-6 sm:mb-4">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            {/* Page Title */}
                            <div className="flex items-center mb-6 md:mb-0">
                                <h2 className="text-xl font-bold">
                                    Ideas/ Submissions
                                </h2>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full max-w-sm">
                                {/* Search Icon */}
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                {/* Input Field */}
                                <Input
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Search ideas by title"
                                    className="w-full h-8 pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 pt-8 sm:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 min-h-[350px]">
                        {displayedIdeas.map((idea) => (
                            <Card
                                key={idea.id}
                                className="px-6 pb-4 pt-6 shadow-md"
                            >
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={idea.author.image}
                                            alt={idea.author.name}
                                        />
                                        <AvatarFallback>
                                            {idea.author.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-sm">
                                            {idea.author.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            <span className="font-semibold">
                                                Category:{' '}
                                            </span>
                                            {idea.category}
                                        </p>
                                    </div>
                                </div>
                                <Separator className="my-2" />
                                <h4 className="font-bold text-lg mt-2 md:truncate">
                                    {idea.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {idea.description}
                                </p>

                                {/* Tags Section */}
                                <div className="flex flex-wrap gap-2 my-4 truncate max-h-6">
                                    {idea.tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-muted text-gray-600 text-xs hover:bg-slate-100 hover:text-gray-600 "
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* View Button */}
                                <div className="pt-2 mt-auto">
                                    <Button
                                        className="px-0 hover:text-blue-700"
                                        variant="link"
                                        size="sm"
                                        onClick={() => openModal(idea)}
                                    >
                                        View Full Details
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col bg-white border-t-2 shadow-md sm:flex-row justify-between sm:gap-0 gap-4 items-center p-6 mt-auto">
                    <span className="text-xs font-medium text-gray-600">
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
                                    htmlFor="ideas-per-page"
                                >
                                    Ideas per page
                                </Label>
                                <SelectTrigger
                                    id="ideas-per-page"
                                    className="w-[60px] h-6 text-xs"
                                >
                                    <SelectValue placeholder="Rows per page" />
                                </SelectTrigger>
                            </div>
                            <SelectContent>
                                <SelectItem className="text-xs" value="6">
                                    6
                                </SelectItem>
                                <SelectItem className="text-xs" value="10">
                                    10
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
            </div>
            <About />
            <Footer />
        </div>
    )
}
