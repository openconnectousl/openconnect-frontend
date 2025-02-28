import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Edit, Plus } from 'lucide-react'
import { ManageSkill } from './ManageSkill'
import ProfileField from './ProfileField'
import { SocialProfiles } from './SocialProfileInput'

interface User {
    name: string
    title: string
    email: string
    degree: string
    uni: string
    faculty: string
    mobile: string
    avatar: string
    linkedin: string
    fb: string
    github: string
    skills: string[]
}

interface EditProfileProps {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const EditProfile: React.FC<EditProfileProps> = ({ user, setUser }) => {
    const [editUser, setEditUser] = useState<User>({ ...user })
    const avatarRef = useRef<HTMLInputElement | null>(null)

    const handleSave = () => {
        setUser(editUser)
    }

    const fields: { label: string; id: keyof User; placeholder: string }[] = [
        { label: 'Name', id: 'name', placeholder: 'Enter Your Name' },
        { label: 'Title', id: 'title', placeholder: 'Enter Your Job Title' },
        {
            label: 'E-mail',
            id: 'email',
            placeholder: 'Enter Your E-mail Address',
        },
        {
            label: 'Mobile',
            id: 'mobile',
            placeholder: 'Enter Your Mobile Number',
        },
        { label: 'Degree', id: 'degree', placeholder: 'Enter Your Degree' },
        {
            label: 'University',
            id: 'uni',
            placeholder: 'Enter Your University Name',
        },
        {
            label: 'Faculty',
            id: 'faculty',
            placeholder: 'Enter Your Faculty Name',
        },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className=" hover:text-blue-700">
                    <Edit /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="relative w-20 flex-shrink-0">
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
                            <label className="absolute -bottom-1 -right-12 w-9 h-9 border-4 border-white bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                                <Plus className="w-5 h-5 text-white" />
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
                            </label>
                        </div>
                    </div>
                    <div className="grid gap-4 py-4">
                        {fields.map((field) => (
                            <ProfileField
                                key={field.id}
                                label={field.label}
                                id={field.id}
                                value={editUser[field.id] as string}
                                placeholder={field.placeholder}
                                onChange={(id, value) =>
                                    setEditUser((prev) => ({
                                        ...prev,
                                        [id]: value,
                                    }))
                                }
                            />
                        ))}
                    </div>

                    <SocialProfiles user={editUser} setUser={setEditUser} />

                    {/* Skills Management */}
                    <ManageSkill
                        skills={editUser.skills}
                        setSkills={(updatedSkills) =>
                            setEditUser({ ...editUser, skills: updatedSkills })
                        }
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
