// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom'
import About from '../ui/About'
import Footer from '../ui/Footer'
import Header from './header/Header.component'
import { RequestPanel } from '@/components/RequestPanel'
import { useApp } from '@/context/AppContext'

export const MainLayout = () => {
    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header
                requests={requests}
                isRequestPanelOpen={isRequestPanelOpen}
                setIsRequestPanelOpen={setIsRequestPanelOpen}
            />
            <main className="flex-1 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
            <About />
            <Footer />
            <RequestPanel
                requests={requests}
                isOpen={isRequestPanelOpen}
                onClose={() => setIsRequestPanelOpen(false)}
            />
        </div>
    )
}
