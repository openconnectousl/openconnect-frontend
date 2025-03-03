import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from '@/components/ui/table'
import { ViewIdea } from '@/components/ViewIdea'
import { Label } from '@radix-ui/react-label'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useState } from 'react'

interface Idea {
    id: number
    title: string
    description: string
    category: string
    tags: string[]
    learningOutcome: string
    recommendedLevel: string
    generalThoughts?: string
    pdfUrl?: string
    url?: string
}

const ideasData: Idea[] = [
    {
        id: 1,
        title: 'AI Chatbot',
        description:
            'An AI chatbot for customer support. An AI chatbot for customer support. An AI chatbot for customer support.',
        category: 'Technology',
        tags: [],
        learningOutcome: 'Improved customer support automation',
        recommendedLevel: 'Intermediate',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        url: 'https://github.com/openconnectousl/openconnect-frontend',
    },
    {
        id: 2,
        title: 'Dark Mode Feature to the platform',
        description: 'Adding dark mode to the platform.',
        category: 'UI/UX',
        tags: ['Dark Mode', 'User Experience'],
        learningOutcome: 'Enhancing user experience',
        recommendedLevel: 'Beginner',
    },
]

export const ProjectsIdeas = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [filteredIdeas] = useState(ideasData)

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

    const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false)
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

    const openModal = (idea: Idea) => {
        setSelectedIdea(idea) // Set the selected idea data
        setViewIdeaModalOpen(true)
    }

    return (
        <>
            {selectedIdea && (
                <ViewIdea
                    open={viewIdeaModalOpen}
                    onOpenChange={setViewIdeaModalOpen}
                    idea={selectedIdea}
                />
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold">
                        Projects/Ideas
                    </CardTitle>
                    <Separator />
                </CardHeader>
                <CardContent className="flex flex-col min-h-40">
                    <div className="flex-grow overflow-auto border border-gray-300 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead>No.</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayedIdeas.map((idea) => (
                                    <TableRow key={idea.id}>
                                        <TableCell>{idea.id}.</TableCell>
                                        <TableCell className="truncate max-w-[100px] sm:max-w-[200px] sm:min-w-[200px]">
                                            {idea.title}
                                        </TableCell>
                                        <TableCell className="truncate max-w-[250px] sm:max-w-[400px] sm:min-w-[400px]">
                                            {idea.description}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => openModal(idea)}
                                                variant="outline3"
                                                size="sm"
                                                className="h-7 ml-6"
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row justify-between sm:gap-0 gap-4 items-center pt-8 mt-auto">
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
                                    <SelectItem className="text-xs" value="5">
                                        5
                                    </SelectItem>
                                    <SelectItem className="text-xs" value="10">
                                        10
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
                </CardContent>
            </Card>
        </>
    )
}
