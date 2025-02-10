import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

// UserProfileHeader.component.tsx
interface UserProfileHeaderProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-3 p-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>
          {user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  )
}
