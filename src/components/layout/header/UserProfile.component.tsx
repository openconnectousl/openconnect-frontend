import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navigationItems } from './navigation-config'

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
                        <AvatarImage src={user.avatar} alt={user.name} />
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
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                </div>
                <DropdownMenuSeparator className="bg-blue-100" />
            </DropdownMenuLabel>
            <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                    <DropdownMenuItem
                        key={item.label}
                        className={`w-full justify-start ${
                            item.className || ''
                        }`}
                        onClick={item.onClick}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
)
