import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Card, CardHeader, CardFooter } from './ui/card'

// components/RequestCard.tsx
export const RequestCard = ({
    request,
}: {
    request: { id: number; name: string; title: string; image: string }
}) => {
    return (
        <Card>
            <CardHeader className="p-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={request.image} alt={request.name} />
                        <AvatarFallback>{request.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="text-sm font-medium">{request.name}</h4>
                        <p className="text-xs text-muted-foreground">
                            {request.title}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                    <Button size="sm" className="w-full">
                        Accept
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                        Ignore
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
