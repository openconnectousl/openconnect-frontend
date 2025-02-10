// components/RequestPanel.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Card,
  CardHeader,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface RequestPanelProps {
  requests: Array<{
    id: number
    name: string
    title: string
    image: string
  }>
  isOpen: boolean
  onClose: () => void
}

export const RequestPanel = ({ requests, isOpen, onClose }: RequestPanelProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Connection Requests</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="shadow-sm">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.image} alt={request.name} />
                      <AvatarFallback className="bg-primary/10">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-none">
                        {request.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {request.title}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full gap-2">
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant="default"
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant="secondary"
                    >
                      Ignore
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}