import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useApp } from '@/context/AppContext'
import HeaderHome from './HeaderHome.v2'
import Header from './Header.component'

const SmartHeader: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    // If user is authenticated, show the main app header
    if (isAuthenticated && user) {
        return (
            <Header
                requests={requests}
                isRequestPanelOpen={isRequestPanelOpen}
                setIsRequestPanelOpen={setIsRequestPanelOpen}
                user={user}
                onLogout={logout}
            />
        )
    }

    // Otherwise show the home/public header
    return <HeaderHome />
}

export default SmartHeader
