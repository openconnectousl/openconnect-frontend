import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface User {
    name: string
    title: string
    email: string
    mobile: string
    degree: string
    uni: string
    faculty: string
    avatar: string
    linkedin: string
    fb: string
    github: string
    skills: string[]
}

interface ProfileFieldProps {
    label: string
    id: keyof User
    value: string
    onChange: (id: keyof User, value: string) => void
}

const ProfileField: React.FC<ProfileFieldProps> = ({
    label,
    id,
    value,
    onChange,
}) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-start">
                {label}
            </Label>
            <Input
                id={id}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
                className="col-span-3"
            />
        </div>
    )
}

export default ProfileField
