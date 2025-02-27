import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@radix-ui/react-dropdown-menu'

export function MyProConnections() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold">
                    Connections
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="space-y-4">
                {[
                    {
                        name: 'Olivia Davis',
                        email: 'olivia.davis@example.com',
                    },
                    {
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                    },
                    {
                        name: 'Alice Smith',
                        email: 'alice.smith@example.com',
                    },
                    {
                        name: 'James Wilson',
                        email: 'james.wilson@example.com',
                    },
                ].map((conn, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage alt={conn.name} />
                                <AvatarFallback
                                    className={` text-slate-700 ${
                                        [
                                            'bg-blue-100',
                                            'bg-red-100',
                                            'bg-green-100',
                                            'bg-yellow-100',
                                        ][Math.floor(Math.random() * 4)]
                                    }`}
                                >
                                    {conn.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{conn.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {conn.email}
                                </p>
                            </div>
                        </div>

                        <Button size="sm" variant="secondary">
                            Connect
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
