import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Download, Link } from 'lucide-react'

interface ViewIdeaProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    idea: {
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
}

export const ViewIdea: React.FC<ViewIdeaProps> = ({
    open,
    onOpenChange,
    idea,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] bg-white p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 text-2xl font-semibold pb-4">
                        {idea.title}
                        <Separator className="mt-2 h-0.5 rounded-full bg-slate-100" />
                    </DialogTitle>
                </DialogHeader>

                <p className="text-gray-700 mb-2">
                    <strong>Category:</strong> {idea.category}
                </p>
                <Separator />

                <p className="text-gray-800 mt-4 mb-2 font-bold">Description</p>
                <p className="text-gray-600">{idea.description}</p>

                <Separator />

                <>
                    <p className="flex items-center gap-4 text-gray-800 mt-4 font-bold">
                        Uploaded PDF
                    </p>
                    {idea.pdfUrl ? (
                        <Button
                            size="sm"
                            onClick={() => window.open(idea.pdfUrl, '_blank')}
                            className="flex items-center gap-2 w-full sm:w-36"
                        >
                            <Download size={16} /> Download PDF
                        </Button>
                    ) : (
                        <p className="text-gray-600 text-xs italic">
                            No PDF available
                        </p>
                    )}
                </>
                <Separator />

                <>
                    <p className="text-gray-800 mt-4 font-bold">
                        Resource URL(Github)
                    </p>
                    {idea.url ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(idea.url, '_blank')}
                            className="flex items-center gap-2 w-full sm:w-36 font-semibold"
                        >
                            <Link />
                            Open URL
                        </Button>
                    ) : (
                        <p className="text-gray-600 text-xs italic">
                            No Resource URL available
                        </p>
                    )}
                </>

                <Separator />

                <p className="text-gray-800 mt-4 mb-2 font-bold">
                    What was learned?
                </p>
                <p className="text-gray-600">{idea.learningOutcome}</p>

                {idea.generalThoughts && (
                    <>
                        <Separator />
                        <p className="text-gray-800 mt-4 mb-2 font-bold">
                            General Thoughts
                        </p>
                        <p className="text-gray-600">{idea.generalThoughts}</p>
                    </>
                )}

                <Separator />

                <div className="mt-4">
                    <p className="text-gray-800 mb-6 font-bold">Tags</p>
                    <div className="flex flex-wrap gap-4 mt-1">
                        {idea.tags.length > 0 ? (
                            idea.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    className="bg-gray-100 text-gray-600"
                                >
                                    {tag}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-gray-600 text-xs italic">
                                No tags available
                            </p>
                        )}
                    </div>
                </div>

                <Separator />

                <DialogFooter className="flex justify-end mt-4">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-gray-400 text-gray-500 px-8"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
