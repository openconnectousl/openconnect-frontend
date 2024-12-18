import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Footer from '@/components/ui/Footer'
import About from '@/components/ui/About'
import Header from '@/components/ui/Header'

const HomeProList: React.FC = () => {
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

    return (
        <div className="flex flex-col bg-gray-50">
            {/* Header */}
            <Header />

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

            {/* Footer */}
            <About />
            <Footer />
        </div>
    )
}

export default HomeProList
