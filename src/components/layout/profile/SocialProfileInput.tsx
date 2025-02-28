import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Github, Linkedin, Facebook } from 'lucide-react'

export const SocialProfiles: React.FC<{ user: any; setUser: any }> = ({
    user,
    setUser,
}) => {
    return (
        <div className="mb-4">
            <CardHeader className="pl-0">
                <CardTitle className="text-base">
                    Manage Your Profiles
                </CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 gap-4">
                {/* GitHub */}
                <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-gray-600" />
                    <Input
                        placeholder="GitHub Profile"
                        value={user.github}
                        onChange={(e) =>
                            setUser({ ...user, github: e.target.value })
                        }
                    />
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-gray-600" />
                    <Input
                        placeholder="LinkedIn Profile"
                        value={user.linkedin}
                        onChange={(e) =>
                            setUser({ ...user, linkedin: e.target.value })
                        }
                    />
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 text-gray-600" />
                    <Input
                        placeholder="Facebook Profile"
                        value={user.fb}
                        onChange={(e) =>
                            setUser({ ...user, fb: e.target.value })
                        }
                    />
                </div>
            </div>
        </div>
    )
}
