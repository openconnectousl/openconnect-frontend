import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Edit } from 'lucide-react'

interface AboutMeProps {
    aboutMe: string
    newAboutMe: string
    setNewAboutMe: (value: string) => void
    handleSaveAboutMe: () => void
}

export const AboutMe = ({
    aboutMe,
    newAboutMe,
    setNewAboutMe,
    handleSaveAboutMe,
}: AboutMeProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold flex justify-between items-center">
                    About Me
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="link"
                                className="text-black hover:text-blue-700"
                            >
                                <Edit />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit About Me</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <Textarea
                                    value={newAboutMe}
                                    onChange={(e) =>
                                        setNewAboutMe(e.target.value)
                                    }
                                    className="w-full"
                                    placeholder="Write something about yourself..."
                                />
                            </DialogDescription>
                            <DialogFooter>
                                <Button onClick={handleSaveAboutMe}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                {aboutMe ||
                    'Hi, New user. Please add something about yourself!'}
            </CardContent>
        </Card>
    )
}
