// MobileButtons.component.tsx
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewIdea } from '../NewIdea.component'

interface MobileButtonsProps {
    onClose: () => void
}
export const MobileButtons: React.FC<MobileButtonsProps> = () => {
    const [NewIdeaModalOpen, setNewIdeaModalOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3">
            <Button
                onClick={() => setNewIdeaModalOpen(true)}
                className="w-full py-3"
            >
                <CirclePlus className="mr-2" /> New Idea
            </Button>
            <Button
                onClick={() => {
                    navigate('/view-ideas')
                }}
                variant="outline"
                className="w-full py-3"
            >
                View Ideas
            </Button>
            <Button variant="outline" className="w-full py-3">
                Event Calendar
            </Button>
            <NewIdea
                open={NewIdeaModalOpen}
                onOpenChange={() => setNewIdeaModalOpen(false)}
            />
        </div>
    )
}
