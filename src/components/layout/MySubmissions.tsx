import { useEffect, useState } from 'react'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import Header from './header/Header.component'
import { RequestPanel } from '../RequestPanel'
import { useApp } from '@/context/AppContext'
import { Label } from '../ui/label'
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    FilterIcon,
    MoreHorizontal,
    Trash,
    View,
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Idea {
    id: number
    title: string
    description: string
    status: 'Pending' | 'Approved' | 'Rejected'
    feedback?: string
}

const ideasData: Idea[] = [
    {
        id: 1,
        title: 'AI Chatbot',
        description: 'An AI chatbot for customer support.',
        status: 'Pending',
        feedback: 'Needs more details.',
    },
    {
        id: 2,
        title: 'Dark Mode Feature',
        description: 'Adding dark mode to the platform.',
        status: 'Approved',
        feedback: 'Great idea! Implementing soon.',
    },
    {
        id: 3,
        title: 'Profile Badges',
        description: 'Introduce user achievement badges.',
        status: 'Rejected',
        feedback: 'Not a priority at the moment.',
    },
    {
        id: 4,
        title: 'New UI Design',
        description: 'Revamping the homepage UI.',
        status: 'Pending',
        feedback: '',
    },
    {
        id: 5,
        title: 'Performance Boost',
        description: 'Improve system speed and caching.',
        status: 'Approved',
        feedback: 'Planned for next update.',
    },
    {
        id: 6,
        title: 'AI Chatbot',
        description: 'An AI chatbot for customer support.',
        status: 'Rejected',
        feedback: 'Needs more details.',
    },
    {
        id: 7,
        title: 'Dark Mode Feature',
        description: 'Adding dark mode to the platform.',
        status: 'Approved',
        feedback: 'Great idea! Implementing soon.',
    },
]

export default function MySubmissions() {
    const [search, setSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    const [filteredIdeas, setFilteredIdeas] = useState(ideasData)
    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

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

        setFilteredIdeas(filtered)
        setCurrentPage(1)
    }, [search, selectedStatus])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status)
    }
    const handleRemoveFilter = () => {
        setSelectedStatus(null)
        setFilteredIdeas(ideasData)
    }

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
            <div className="p-8 mx-auto min-h-[680px]">
                <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                <Card className="flex flex-col p-8 min-h-96">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 ">
                        <Input
                            placeholder="Search ideas by title..."
                            value={search}
                            onChange={handleSearch}
                            className="sm:w-60 w-full h-8"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline3"
                                    className="flex items-center border-dashed h-8"
                                >
                                    <FilterIcon />
                                    <span>
                                        {selectedStatus
                                            ? selectedStatus
                                            : 'Status'}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    className="text-gray-800 font-medium"
                                    onClick={() =>
                                        handleStatusSelect('Pending')
                                    }
                                >
                                    Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-green-800 font-medium"
                                    onClick={() =>
                                        handleStatusSelect('Approved')
                                    }
                                >
                                    Approved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-800 font-medium"
                                    onClick={() =>
                                        handleStatusSelect('Rejected')
                                    }
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
                    <div className="flex-grow overflow-auto border border-gray-300 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead>No.</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Feedback</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayedIdeas.map((idea) => (
                                    <TableRow key={idea.id}>
                                        <TableCell>{idea.id}.</TableCell>
                                        <TableCell>{idea.title}</TableCell>
                                        <TableCell>
                                            {idea.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    idea.status === 'Approved'
                                                        ? 'default2'
                                                        : idea.status ===
                                                          'Rejected'
                                                        ? 'destructive2'
                                                        : 'secondary'
                                                }
                                            >
                                                {idea.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {idea.feedback || 'No feedback yet'}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline3"
                                                        size="sm"
                                                    >
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <View className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row justify-between sm:gap-0 gap-4 items-center mt-8">
                        <span className="text-xs text-gray-600">
                            Total submissions: {filteredIdeas.length}
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
                                                <ChevronLeft
                                                    strokeWidth={2.5}
                                                />
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
                                                <ChevronRight
                                                    strokeWidth={2.5}
                                                />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
