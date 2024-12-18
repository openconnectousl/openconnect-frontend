import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    CircleDashed,
    CirclePlus,
    CircleUserRound,
    LogOut,
    Menu,
    Settings,
    X,
} from 'lucide-react'
import { useState } from 'react'

const Header: React.FC = () => {
    const user = [
        {
            name: 'Pasindu Bandara',
            email: 'pasindumadusanka526@gmail.com',
            avatar: 'https://github.com/shadcn.png',
        },
    ]

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Header */}
            <div>
                <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between flex-wrap md:flex-nowrap">
                    {/* Logo Section */}
                    <div className="flex flex-col">
                        <p className="text-blue-600 text-2xl font-semibold">
                            OpenConnect
                        </p>
                        <p className="text-gray-600 text-xs">
                            Idea Sharing & Collaboration Platform
                        </p>
                    </div>

                    {/* Buttons Section (Right Side) */}
                    <div className="hidden md:flex items-center space-x-4 md:space-x-6 md:ml-auto flex-wrap justify-end w-full sm:w-auto">
                        <Button className="py-5">
                            <CirclePlus /> New Idea
                        </Button>
                        <Button variant="outline" className="py-5">
                            View Ideas
                        </Button>
                        <Button variant="outline" className="py-5">
                            Event Calendar
                        </Button>

                        {/* User Profile Dropdown */}
                        {user.map((user) => (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(' ')
                                                    .slice(0, 2)
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-solid w-48 m-4">
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage
                                                    src={user.avatar}
                                                    alt={user.name}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    {user.name
                                                        .split(' ')
                                                        .slice(0, 2)
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>
                                        <DropdownMenuSeparator className="bg-blue-100" />
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            console.log('Check Status clicked')
                                        }
                                    >
                                        <CircleDashed />
                                        Check Status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            console.log('Profile clicked')
                                        }
                                    >
                                        <CircleUserRound />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            console.log('Settings clicked')
                                        }
                                    >
                                        <Settings />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-blue-100" />
                                    <DropdownMenuItem
                                        onClick={() =>
                                            console.log('Logout clicked')
                                        }
                                        className="text-red-600"
                                    >
                                        <LogOut />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </div>

                    {/* Hamburger Menu Button */}
                    {isMobileMenuOpen ? (
                        // Close Button when Mobile Menu is Open
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
                            aria-label="Toggle Menu"
                        >
                            <X />
                        </button>
                    ) : (
                        // Menu Button when Mobile Menu is Closed
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
                            aria-label="Toggle Menu"
                        >
                            <Menu />
                        </button>
                    )}
                </div>

                {/* Dropdown List- Hamburger Menu */}
                <div className="border-t-2">
                    {isMobileMenuOpen && (
                        <div className="absolute left-0 w-full bg-white shadow-lg z-50 md:hidden">
                            <div className="flex flex-col space-y-4 px-6 py-4">
                                <Button className="w-full py-3">
                                    <CirclePlus /> New Idea
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full py-3"
                                >
                                    View Ideas
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full py-3 mb-2"
                                >
                                    Event Calendar
                                </Button>

                                {/* Check Status, Profile, Settings, Logout Options */}
                                <div className="border-t">
                                    <ul className="flex flex-col font-medium mt-4 gap-2">
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center p-2 hover:bg-slate-100 rounded"
                                                onClick={() =>
                                                    console.log(
                                                        'Check Status clicked'
                                                    )
                                                }
                                                aria-current="page"
                                            >
                                                <CircleDashed className="inline-block mr-2" />
                                                Check Status
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center p-2 hover:bg-slate-100 rounded"
                                                onClick={() =>
                                                    console.log(
                                                        'Profile clicked'
                                                    )
                                                }
                                                aria-current="page"
                                            >
                                                <CircleUserRound className="inline-block mr-2" />
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center p-2 hover:bg-slate-100 rounded"
                                                onClick={() =>
                                                    console.log(
                                                        'Settings clicked'
                                                    )
                                                }
                                            >
                                                <Settings className="inline-block mr-2" />
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center p-2 hover:bg-slate-100 rounded"
                                                onClick={() =>
                                                    console.log(
                                                        'Logout clicked'
                                                    )
                                                }
                                            >
                                                <LogOut className="inline-block mr-2" />
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* User Profile */}
                                {user.map((user) => (
                                    <div className="flex items-center gap-4 py-4 px-2 border-t">
                                        <Avatar className="w-12 h-12 rounded-lg">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(' ')
                                                    .slice(0, 2)
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="truncate">
                                            <p className="font-semibold">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header
