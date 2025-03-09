import { CircleUserRound, Settings, LogOut, LibraryBig } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface NavigationItem {
    label: string
    icon: LucideIcon
    onClick: () => void
    className?: string
}

export const navigationItems: NavigationItem[] = [
    {
        label: 'My Submissions',
        icon: LibraryBig,
        onClick: () => console.log('Check Status clicked'),
    },
    {
        label: 'Profile',
        icon: CircleUserRound,
        onClick: () => console.log('Profile clicked'),
    },
    {
        label: 'Settings',
        icon: Settings,
        onClick: () => console.log('Settings clicked'),
    },
    {
        label: 'Logout',
        icon: LogOut,
        onClick: () => console.log('Logout clicked'),
        className: 'text-red-600',
    },
]
