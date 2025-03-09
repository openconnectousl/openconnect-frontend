import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface MobileUserProfileProps {
    user: {
        name: string
        email: string
        avatar: string
    }
    onClose: () => void
}

export const MobileUserProfile: React.FC<MobileUserProfileProps> = ({
    user,
}) => {
    return (
        <div className="flex items-center gap-4 py-4 px-2 border-t">
            <Avatar className="w-12 h-12 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
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
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
            </div>
        </div>
    )
}
