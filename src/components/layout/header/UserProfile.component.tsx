import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navigationItems } from './navigation-config'
import { UserProfileHeader } from './UserProfileHeader.component'

interface UserProfileProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export const UserProfile = ({ user }: UserProfileProps) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 m-4">
        <UserProfileHeader user={user} />
        <DropdownMenuSeparator className="bg-blue-100" />
        {navigationItems.map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
