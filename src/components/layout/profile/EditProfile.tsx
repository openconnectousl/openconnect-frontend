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
import { UploadIcon, Edit } from 'lucide-react'
import { ManageSkill } from './ManageSkill'
import ProfileField from './ProfileField'

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

    const handleUploadClick = () => {
        if (avatarRef.current) {
            avatarRef.current.click()
        }
    }

    const fields: { label: string; id: keyof User }[] = [
        { label: 'Name', id: 'name' },
        { label: 'Title', id: 'title' },
        { label: 'E-mail', id: 'email' },
        { label: 'Mobile', id: 'mobile' },
        { label: 'Degree', id: 'degree' },
        { label: 'University', id: 'uni' },
        { label: 'Faculty', id: 'faculty' },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className=" hover:text-blue-700">
                    <Edit /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
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
                                        avatar: URL.createObjectURL(file),
                                    })
                                }
                            }}
                        />
                    </div>
                    <div className="grid gap-4 py-4">
                        {fields.map((field) => (
                            <ProfileField
                                key={field.id}
                                label={field.label}
                                id={field.id}
                                value={editUser[field.id] as string}
                                onChange={(id, value) =>
                                    setEditUser((prev) => ({
                                        ...prev,
                                        [id]: value,
                                    }))
                                }
                            />
                        ))}
                    </div>

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
