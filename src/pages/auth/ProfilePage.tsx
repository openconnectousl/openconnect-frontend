import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    CircleUserRound,
    LogOut,
    Menu,
    Search,
    Settings,
    X,
} from 'lucide-react'
import Footer from '@/components/ui/Footer'
import About from '@/components/ui/About'
import { useState } from 'react'

const ProfilePage: React.FC = () => {
    const user = [
        {
            name: 'Pasindu Bandara',
            email: 'pasindumadusanka526@gmail.com',
            avatar: 'https://github.com/shadcn.png',
        },
    ]

    const users = [
        {
            id: 1,
            name: 'Pasindu Madusanka',
            title: 'Software Engineer',
            image: '',
            faculty: 'Faculty of Computer Engineering',
            program: 'BSE',
        },
        {
            id: 2,
            name: 'Ashan Vithanaarachchi',
            title: 'Front-end Developer',
            image: 'https://via.placeholder.com/150',
            faculty: 'Faculty of Computer Engineering',
            program: 'BSE',
        },
        {
            id: 3,
            name: 'Mayura Bandara Alahakoon',
            title: 'Fullstack Developer',
            image: '',
            faculty: 'Faculty of Computer Engineering',
            program: 'BSE',
        },
        {
            id: 4,
            name: 'Sandaruwan Ranathunga',
            title: 'UX Designer',
            image: '',
            faculty: 'Faculty of Computer Engineering',
            program: 'BSE',
        },
        {
            id: 5,
            name: 'Saman Rathnayaka',
            title: 'Marketing Manager',
            image: 'https://via.placeholder.com/150',
            faculty: 'Faculty of Business Management',
            program: 'MBA',
        },
        {
            id: 6,
            name: 'Hasitha Thilakarathna',
            title: 'Researcher',
            image: 'https://via.placeholder.com/150',
            faculty: 'Faculty of Science',
            program: 'PhD',
        },
    ]

    const requests = [
        {
            id: 1,
            name: 'Hasindu Nagolla',
            title: 'Data Analyst',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Prabhath Kaluarachchi',
            title: 'Graphic Designer',
            image: 'https://via.placeholder.com/150',
        },
    ]

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="flex flex-col bg-gray-50">
            <div>
                {/* Header */}
                <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    {/* Logo Section */}
                    <div className="flex flex-col mb-4 sm:mb-0">
                        <p className="text-blue-600 text-2xl font-semibold">
                            OpenConnect
                        </p>
                        <p className="text-gray-600 text-xs">
                            Idea Sharing & Collaboration Platform
                        </p>
                    </div>

                    {/* Buttons Section (Right Side) */}
                    <div className="hidden lg:flex items-center space-x-4 sm:space-x-6 sm:ml-auto flex-wrap justify-end w-full sm:w-auto">
                        <Button className="py-5">Submit Your New Idea</Button>
                        <Button variant="outline" className="py-5">
                            Check Status
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
                    {/* Mobile Menu Button */}
                    {isMobileMenuOpen ? (
                        // Close Button when Mobile Menu is Open
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="lg:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
                            aria-label="Toggle Menu"
                        >
                            <X />
                        </button>
                    ) : (
                        // Menu Button when Mobile Menu is Closed
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
                            aria-label="Toggle Menu"
                        >
                            <Menu />
                        </button>
                    )}
                </div>

                {/* Dropdown List- Hamburger Menu */}
                <div className="border-t-2">
                    {isMobileMenuOpen && (
                        <div className="absolute left-0 w-full bg-white shadow-lg z-50 lg:hidden">
                            <div className="flex flex-col space-y-4 px-6 py-4">
                                <Button className="w-full py-3">
                                    Submit Your New Idea
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full py-3"
                                >
                                    Check Status
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full py-3 mb-2"
                                >
                                    Event Calendar
                                </Button>

                                {/* Profile, Settings, Logout Options */}
                                <div className="border-t">
                                    <ul className="flex flex-col font-medium mt-4 gap-2">
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

            {/* User Profiles Section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 flex-grow">
                {/* Left Section */}
                <div className="lg:col-span-5 p-6 rounded-md pb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold mb-2 lg:mb-0">
                            User Profiles
                        </h2>
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-1/3">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-950"
                                size={20}
                            />
                            <Input
                                type="text"
                                placeholder="Search profiles..."
                                className="pl-10 w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {users.map((user) => (
                            <Card
                                key={user.id}
                                className="border border-gray-300 shadow-md p-4 flex flex-col"
                            >
                                <div className="flex items-center justify-center py-3">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage
                                            src={user.image}
                                            alt={user.name}
                                        />
                                        <AvatarFallback
                                            className={`text-5xl text-slate-700 ${
                                                [
                                                    'bg-blue-100',
                                                    'bg-red-100',
                                                    'bg-green-100',
                                                    'bg-yellow-100',
                                                ][Math.floor(Math.random() * 4)]
                                            }`}
                                        >
                                            {user.name
                                                .split(' ')
                                                .slice(0, 2)
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardHeader className="py-2 px-0">
                                    <CardTitle className="text-lg font-medium text-center">
                                        {user.name}
                                    </CardTitle>
                                </CardHeader>
                                <div className="text-sm text-gray-600 text-center">
                                    <p className="pb-1">{user.title}</p>
                                    <p className="pb-1">{user.faculty}</p>
                                    <p className="pb-1">{user.program}</p>
                                </div>
                                <div className="mt-auto">
                                    <Button className="w-full mt-4">
                                        Connect
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Request Section */}
                <div className="bg-gray-200 p-6 space-y-4 lg:col-span-2 pb-12">
                    <h2 className="text-xl font-semibold mb-4">
                        Connection Requests
                    </h2>
                    <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
                        {requests.map((request) => (
                            <Card
                                key={request.id}
                                className="border border-gray-300 shadow-md p-3"
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Avatar on the left */}
                                    <Avatar className="w-1/4 h-1/4 xl:w-20 xl:h-20">
                                        <AvatarImage
                                            src={request.image}
                                            alt={request.name}
                                        />
                                        <AvatarFallback>
                                            {request.name[0]}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <p className="font-medium text-sm">
                                            {request.name}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {request.title}
                                        </p>

                                        {/* Buttons section */}
                                        <div className="flex justify-between mt-2 space-x-2">
                                            <Button className="w-full text-xs">
                                                Accept
                                            </Button>
                                            <Button
                                                variant="outline2"
                                                className="w-full text-xs"
                                            >
                                                Ignore
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <About />
            <Footer />
        </div>
    )
}

export default ProfilePage
