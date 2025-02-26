import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Mail,
    Phone,
    GraduationCap,
    University,
    School,
    Linkedin,
    Facebook,
    Github,
} from 'lucide-react'

interface MyProProfileCardProps {
    user: {
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
    }
}

export const MyProProfileCard: React.FC<MyProProfileCardProps> = ({ user }) => {
    return (
        <Card>
            <CardHeader className="flex flex-col items-center p-6">
                <Avatar className="w-32 h-32">
                    <AvatarImage src={user.avatar} alt={user.name} />
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
                <p className="text-sm text-muted-foreground">{user.title}</p>
                <Separator className="my-4" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-left">
                {[
                    { icon: Mail, label: 'E-mail:', value: user.email },
                    { icon: Phone, label: 'Mobile:', value: user.mobile },
                    {
                        icon: GraduationCap,
                        label: 'Degree:',
                        value: user.degree,
                    },
                    { icon: University, label: 'University:', value: user.uni },
                    { icon: School, label: 'Faculty:', value: user.faculty },
                ].map(({ icon: Icon, label, value }, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center gap-2"
                    >
                        <div className="flex items-center gap-2 min-w-[120px]">
                            <Icon className="w-4 sm:w-5 text-gray-600" />
                            <span className="font-semibold">{label}</span>
                        </div>
                        <span className="text-gray-700 sm:flex-1">{value}</span>
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
                    <a href={user.fb} target="_blank" rel="noopener noreferrer">
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
    )
}
