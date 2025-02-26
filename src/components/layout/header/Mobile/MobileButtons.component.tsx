// MobileButtons.component.tsx
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'

interface MobileButtonsProps {
    onClose: () => void
}
export const MobileButtons: React.FC<MobileButtonsProps> = () => {
    return (
        <div className="flex flex-col gap-3">
            <Button className="w-full py-3">
                <CirclePlus className="mr-2" /> New Idea
            </Button>
            <Button variant="outline" className="w-full py-3">
                View Ideas
            </Button>
            <Button variant="outline" className="w-full py-3">
                Event Calendar
            </Button>
        </div>
    )
}
