import { useState } from 'react'
import Header from './header/Header.component'
import { useApp } from '@/context/AppContext'
import { RequestPanel } from '@/components/RequestPanel'
import { ProjectsIdeas } from '../profile/ProjectsIdeas'
import { MyProConnections } from '../profile/MyProConnections'
import { AboutMe } from '../profile/AboutMe'
import { EditProfile } from '../profile/EditProfile'
import { SkillsSection } from '../profile/SkillsSection'
import { MyProProfileCard } from '../profile/MyProProfileCard'

export const MyProfileLayout = () => {
    const [user, setUser] = useState({
        name: 'Pasindu Bandara',
        fullName: 'P G P M bandara',
        title: 'Intern Software Engineer',
        email: 's22010356@ousl.lk',
        degree: 'BSE',
        uni: 'The Open University of Sri Lanka',
        faculty: 'Faculty of Computer Engineering',
        mobile: '(+94) 71-350-8217',
        avatar: 'https://github.com/shadcn.png',
        linkedin: 'www.linkedin.com/in/pasindu-bandara-ab6925254',
        fb: 'www.facebook.com',
        github: 'www.github.com',
        skills: [
            'Photoshop',
            'Figma',
            'HTML',
            'React',
            'Tailwind CSS',
            'CSS',
            'Laravel',
            'Node.js',
        ],
    })

    const [aboutMe, setAboutMe] = useState('')

    const handleSaveAboutMe = () => {
        setAboutMe(newAboutMe)
    }

    const [newAboutMe, setNewAboutMe] = useState(aboutMe)

    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    return (
        <div className="bg-gray-50">
            <Header
                requests={requests}
                isRequestPanelOpen={isRequestPanelOpen}
                setIsRequestPanelOpen={setIsRequestPanelOpen}
            />
            <RequestPanel
                requests={requests}
                isOpen={isRequestPanelOpen}
                onClose={() => setIsRequestPanelOpen(false)}
            />
            <div className="p-6 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold mb-2 lg:mb-0">
                        My Profile
                    </h2>

                    {/* Edit Profile */}
                    <EditProfile user={user} setUser={setUser} />
                </div>

                {/* Main Content */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel */}
                    <div className="flex flex-col lg:col-span-1 gap-6">
                        <MyProProfileCard user={user} />

                        {/* Skills Section */}
                        <SkillsSection skills={user.skills} />
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Right Panel - left */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <AboutMe
                                aboutMe={aboutMe}
                                newAboutMe={newAboutMe}
                                setNewAboutMe={setNewAboutMe}
                                handleSaveAboutMe={handleSaveAboutMe}
                            />
                            <MyProConnections />
                        </div>

                        {/* Right Panel - right */}
                        <ProjectsIdeas />
                    </div>
                </div>
            </div>
        </div>
    )
}
