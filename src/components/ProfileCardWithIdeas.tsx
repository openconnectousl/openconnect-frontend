import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from '@/components/ui/hover-card'
import { UserProfileWithIdeas } from '@/types'

export const ProfileCardWithIdeas = ({
    user,
}: {
    user: UserProfileWithIdeas
}) => {
    const displayName =
        `${user.firstname || ''} ${user.lastname || ''}`.trim()
    const avatarUrl =
        user.avatarURL

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar className="w-24 h-24 mx-auto">
                            <AvatarImage src={avatarUrl} alt={displayName} />
                            <AvatarFallback className="bg-primary/10 text-2xl">
                                {displayName
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold">
                                {displayName}
                            </h4>
                            {user.faculty && (
                                <p className="text-sm">{user.faculty}</p>
                            )}
                            {user.program && (
                                <p className="text-sm text-muted-foreground">
                                    {user.program}
                                </p>
                            )}
                            {user.bio && (
                                <p className="text-xs text-muted-foreground line-clamp-3">
                                    {user.bio}
                                </p>
                            )}
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <h3 className="font-semibold mt-2">{displayName}</h3>
                {user.title && (
                    <p className="text-sm text-muted-foreground">
                        {user.title}
                    </p>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-1 text-sm text-center">
                    {user.faculty && <p>{user.faculty}</p>}
                    {user.program && (
                        <p className="text-muted-foreground">{user.program}</p>
                    )}

                    {user.skills && user.skills.length > 0 && (
                        <div className="pt-3">
                            <p className="font-semibold text-xs mb-2">
                                Skills:
                            </p>
                            <div className="flex flex-wrap justify-center gap-1">
                                {user.skills.slice(0, 3).map((skill, i) => (
                                    <Badge
                                        key={i}
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                                {user.skills.length > 3 && (
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        +{user.skills.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}

                    {user.ideas && user.ideas.length > 0 && (
                        <div className="pt-3">
                            <p className="font-semibold text-xs mb-2">Ideas:</p>
                            <p className="text-xs text-muted-foreground">
                                {user.ideas.length} idea
                                {user.ideas.length !== 1 && 's'} submitted
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                <Button className="w-full">Connect</Button>
            </CardFooter>
        </Card>
    )
}
