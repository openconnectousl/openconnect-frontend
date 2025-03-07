import { Outlet } from 'react-router-dom'
import AdminSidebar from './Admin-sidebar'
import { AdminLogo } from './AdminLogo.component'
import { useState } from 'react'

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Side Pannel */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 text-gray-900 overflow-y-auto">
                <header
                    className={`md:hidden bg-white shadow-md py-3 flex items-center justify-end sticky w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 top-0 left-0 right-0 z-40 ${
                        sidebarOpen ? 'hidden' : ''
                    }`}
                >
                    <AdminLogo />
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
