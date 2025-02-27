import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'

export const ProjectsIdeas = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold">
                    Projects/Ideas
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="space-y-4">
                {[
                    {
                        title: 'Shadcn UI Kit Application UI v2.0.0',
                        date: 'January 13th, 2022',
                        description:
                            'Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',
                    },
                    {
                        title: 'Shadcn UI Kit Figma v1.3.0',
                        date: 'December 7th, 2021',
                        description:
                            'All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.',
                    },
                    {
                        title: 'Shadcn UI Kit Library v1.2.2',
                        date: 'December 2nd, 2021',
                        description:
                            'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
                    },
                ].map((activity, idx) => (
                    <div key={idx} className="space-y-1">
                        <h4 className="text-sm font-bold">{activity.title}</h4>
                        <p className="text-xs text-muted-foreground">
                            Released on {activity.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {activity.description}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
