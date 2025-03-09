import { Button } from '@/components/ui/button.tsx'
import { CirclePlus } from 'lucide-react'
import { ConnectionRequestButton } from './NewConnectionRequestButton.component.tsx'
import { NotificationButton } from './NotificationButton.component.tsx'
import { NewIdea } from './NewIdea.component.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface NavButtonsProps {
    requests: Array<{
        id: number
        name: string
        title: string
        image: string
    }>
    setIsRequestPanelOpen: (isOpen: boolean) => void
}

export const NavButtons: React.FC<NavButtonsProps> = ({
    requests,
    setIsRequestPanelOpen,
}) => {
    const [NewIdeaModalOpen, setNewIdeaModalOpen] = useState(false)

    const navigate = useNavigate()
    return (
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            <Button onClick={() => setNewIdeaModalOpen(true)} className="py-5">
                <CirclePlus className="mr-2" /> New Idea
            </Button>
            <Button
                onClick={() => {
                    navigate('/view-ideas')
                }}
                variant="outline"
                className="py-5"
            >
                View Ideas
            </Button>
            <Button variant="outline" className="py-5">
                Event Calendar
            </Button>

            <ConnectionRequestButton
                count={requests.length}
                onClick={() => setIsRequestPanelOpen(true)}
            />

            <NotificationButton
                count={requests.length}
                onClick={() => setIsRequestPanelOpen(true)}
            />
            <NewIdea
                open={NewIdeaModalOpen}
                onOpenChange={() => setNewIdeaModalOpen(false)}
            />
        </div>
    )
}
