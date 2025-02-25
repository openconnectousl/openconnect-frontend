import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    CircleX,
    Edit,
    Facebook,
    Github,
    GraduationCap,
    Linkedin,
    Mail,
    Phone,
    School,
    University,
    UploadIcon,
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label' // Fixed Import
import { Input } from '@/components/ui/input'
import Header from './header/Header.component'
import { Textarea } from '@/components/ui/textarea'
import { useApp } from '@/context/AppContext'

const MyProfile: React.FC = () => {
    const [user, setUser] = useState({
        name: 'Pasindu Bandara',
        title: 'Intern Software Engineer',
        email: 's22010356@ousl.lk',
        degree: 'BSE',
        uni: 'The Open University of Sri Lanka',
        faculty: 'Faculty of Computer Engineering',
        mobile: '(+94) 71-350-8217',
        avatar: 'https://github.com/shadcn.png',
        linkedin: 'www.linkedin.com/in/pasindu-bandara-ab6925254',
        fb: 'www.facebook.com',
        github: 'www.github.com',
        skills: [
            'Photoshop',
            'Figma',
            'HTML',
            'React',
            'Tailwind CSS',
            'CSS',
            'Laravel',
            'Node.js',
        ],
    })

    const [editUser, setEditUser] = useState({ ...user })
    const [newSkill, setNewSkill] = useState<string>('')
    const [aboutMe, setAboutMe] = useState('')

    const handleSave = () => {
        setUser(editUser)
    }

    const addSkill = () => {
        if (newSkill.trim() && !editUser.skills.includes(newSkill)) {
            setEditUser({
                ...editUser,
                skills: [...editUser.skills, newSkill],
            })
            setNewSkill('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setEditUser({
            ...editUser,
            skills: editUser.skills.filter((skill) => skill !== skillToRemove),
        })
    }

    const avatarRef = useRef<HTMLInputElement | null>(null)

    const handleUploadClick = () => {
        if (avatarRef.current) {
            avatarRef.current.click()
        }
    }

    const handleSaveAboutMe = () => {
        setAboutMe(newAboutMe)
    }

    const [newAboutMe, setNewAboutMe] = useState(aboutMe)

    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    return (
        <div className="bg-gray-50">
            <Header
                requests={requests}
                isRequestPanelOpen={isRequestPanelOpen}
                setIsRequestPanelOpen={setIsRequestPanelOpen}
            />
            <div className="p-6 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold mb-2 lg:mb-0">
                        My Profile
                    </h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="link"
                                className=" hover:text-blue-700"
                            >
                                <Edit /> Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-center gap-4 mb-4">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage
                                            src={editUser.avatar}
                                            alt={editUser.name}
                                        />
                                        <AvatarFallback className="text-5xl">
                                            {editUser.name
                                                .split(' ')
                                                .slice(0, 2)
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleUploadClick}
                                    >
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        Upload Photo
                                    </Button>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={avatarRef}
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                const file = e.target.files[0]
                                                setEditUser({
                                                    ...editUser,
                                                    avatar: URL.createObjectURL(
                                                        file
                                                    ),
                                                })
                                            }
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">Name</Label>
                                    <Input
                                        id="name"
                                        value={editUser.name}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                name: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">Title</Label>
                                    <Input
                                        id="title"
                                        value={editUser.title}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                title: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">E-mail</Label>
                                    <Input
                                        id="email"
                                        value={editUser.email}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                email: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">Mobile</Label>
                                    <Input
                                        id="mobile"
                                        value={editUser.mobile}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                mobile: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">Degree</Label>
                                    <Input
                                        id="degree"
                                        value={editUser.degree}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                degree: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">
                                        University
                                    </Label>
                                    <Input
                                        id="university"
                                        value={editUser.uni}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                uni: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-start">
                                        Faculty
                                    </Label>
                                    <Input
                                        id="faculty"
                                        value={editUser.faculty}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                faculty: e.target.value,
                                            })
                                        }
                                        className="col-span-3"
                                    />
                                </div>

                                {/* Skills Management */}
                                <div className="mb-4">
                                    <CardHeader className="pl-0">
                                        <CardTitle className="text-base">
                                            Manage Your Skills
                                        </CardTitle>
                                    </CardHeader>
                                    <div className="flex flex-wrap gap-2">
                                        {editUser.skills.map((skill) => (
                                            <div
                                                key={skill}
                                                className="flex items-center text-xs bg-muted px-2 py-1 rounded text-foreground"
                                            >
                                                <span>{skill}</span>
                                                <button
                                                    onClick={() =>
                                                        removeSkill(skill)
                                                    }
                                                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                                                >
                                                    <CircleX size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) =>
                                            setNewSkill(e.target.value)
                                        }
                                        placeholder="Add a Interested/Skill..."
                                    />
                                    <Button
                                        onClick={addSkill}
                                        className="text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSave}>
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Main Content */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="flex flex-col items-center p-6">
                                <Avatar className="w-32 h-32">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="text-5xl">
                                        {user.name
                                            .split(' ')
                                            .slice(0, 2)
                                            .map((n) => n[0])
                                            .join('')
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-lg font-bold text-center pt-2">
                                    {user.name}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {user.title}
                                </p>
                                <Separator className="my-4" />
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-left">
                                {[
                                    {
                                        icon: Mail,
                                        label: 'E-mail:',
                                        value: user.email,
                                    },
                                    {
                                        icon: Phone,
                                        label: 'Mobile:',
                                        value: user.mobile,
                                    },
                                    {
                                        icon: GraduationCap,
                                        label: 'Degree:',
                                        value: user.degree,
                                    },
                                    {
                                        icon: University,
                                        label: 'University:',
                                        value: user.uni,
                                    },
                                    {
                                        icon: School,
                                        label: 'Faculty:',
                                        value: user.faculty,
                                    },
                                ].map(({ icon: Icon, label, value }, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center gap-2"
                                    >
                                        <div className="flex items-center gap-2 min-w-[120px]">
                                            <Icon className="w-4 sm:w-5 text-gray-600" />
                                            <span className="font-semibold">
                                                {label}
                                            </span>
                                        </div>
                                        <span className="text-gray-700 sm:flex-1">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                                <div className="flex items-center">
                                    <a
                                        href={user.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Linkedin className="inline-block mr-3 w-6 mt-4" />
                                    </a>
                                    <a
                                        href={user.fb}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Facebook className="inline-block mr-3 w-6 mt-4" />
                                    </a>
                                    <a
                                        href={user.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="inline-block mr-3 w-6 mt-4" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills Section */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-base font-bold">
                                    Interested/Skill Area:
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs bg-muted px-2 py-1 rounded text-foreground"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Me & Connections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* About Me */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base font-bold flex justify-between items-center">
                                        About Me
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="link"
                                                    className="text-black hover:text-blue-700"
                                                >
                                                    <Edit />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Edit About Me
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    <Textarea
                                                        value={newAboutMe}
                                                        onChange={(e) =>
                                                            setNewAboutMe(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full"
                                                        placeholder="Write something about yourself..."
                                                    />
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <Button
                                                        onClick={
                                                            handleSaveAboutMe
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </CardTitle>
                                    <Separator />
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {aboutMe ||
                                        'Hi, New user. Please add something about yourself!'}
                                </CardContent>
                            </Card>

                            {/* Connections */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base font-bold">
                                        Connections
                                    </CardTitle>
                                    <Separator />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        {
                                            name: 'Olivia Davis',
                                            email: 'olivia.davis@example.com',
                                        },
                                        {
                                            name: 'John Doe',
                                            email: 'john.doe@example.com',
                                        },
                                        {
                                            name: 'Alice Smith',
                                            email: 'alice.smith@example.com',
                                        },
                                        {
                                            name: 'James Wilson',
                                            email: 'james.wilson@example.com',
                                        },
                                    ].map((conn, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        alt={conn.name}
                                                    />
                                                    <AvatarFallback
                                                        className={` text-slate-700 ${
                                                            [
                                                                'bg-blue-100',
                                                                'bg-red-100',
                                                                'bg-green-100',
                                                                'bg-yellow-100',
                                                            ][
                                                                Math.floor(
                                                                    Math.random() *
                                                                        4
                                                                )
                                                            ]
                                                        }`}
                                                    >
                                                        {conn.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">
                                                        {conn.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {conn.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                size="sm"
                                                variant="secondary"
                                            >
                                                Connect
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Latest Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base font-bold">
                                    Projects/Ideas
                                </CardTitle>
                                <Separator />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    {
                                        title: 'Shadcn UI Kit Application UI v2.0.0',
                                        date: 'January 13th, 2022',
                                        description:
                                            'Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',
                                    },
                                    {
                                        title: 'Shadcn UI Kit Figma v1.3.0',
                                        date: 'December 7th, 2021',
                                        description:
                                            'All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.',
                                    },
                                    {
                                        title: 'Shadcn UI Kit Library v1.2.2',
                                        date: 'December 2nd, 2021',
                                        description:
                                            'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
                                    },
                                ].map((activity, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <h4 className="text-sm font-bold">
                                            {activity.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Released on {activity.date}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.description}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
