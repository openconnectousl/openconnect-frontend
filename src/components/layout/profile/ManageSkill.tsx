import { useState } from 'react'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CircleX, Plus } from 'lucide-react'

interface SkillManagerProps {
    skills: string[]
    setSkills: (skills: string[]) => void
}

export const ManageSkill: React.FC<SkillManagerProps> = ({
    skills,
    setSkills,
}) => {
    const [newSkill, setNewSkill] = useState('')

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill])
            setNewSkill('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove))
    }

    return (
        <div className="mb-4">
            <CardHeader className="pl-0">
                <CardTitle className="text-base">Manage Your Skills</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <div
                        key={skill}
                        className="flex items-center text-xs bg-muted px-2 py-1 rounded text-foreground"
                    >
                        <span>{skill}</span>
                        <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            <CircleX size={12} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <Input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add an Interest/Skill..."
                />
                <Button
                    onClick={addSkill}
                    className="text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <Plus />
                </Button>
            </div>
        </div>
    )
}
