// components/ProfileCard.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserProfile {
  id: number
  name: string
  title: string
  faculty: string
  program: string
  image: string
}

export const ProfileCard = ({ user }: { user: UserProfile }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{user.name}</h4>
              <p className="text-sm">{user.faculty}</p>
              <p className="text-sm text-muted-foreground">{user.program}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
        <h3 className="font-semibold mt-2">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.title}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm text-center">
          <p>{user.faculty}</p>
          <p className="text-muted-foreground">{user.program}</p>
        </div>
      </CardContent>
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full">Connect</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send connection request</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
