import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SkillsSectionProps {
    skills: string[]
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold">
                    Interested/Skill Area:
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="text-xs bg-muted px-2 py-1 rounded text-foreground"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
