import { X, Menu } from 'lucide-react'

interface MobileMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
    isOpen,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
            aria-label="Toggle Menu"
        >
            {isOpen ? <X /> : <Menu />}
        </button>
    )
}
