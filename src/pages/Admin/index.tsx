import { Outlet } from 'react-router-dom'
//import AdminSidebar from '@/components/admin/AdminSidebar.component'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/components/admin/AdminSidebar.component.v2'

export default function AdminLayout() {
    return (
        <div className="h-screen flex overflow-hidden bg-gray-50">
            <SidebarProvider>
                <AdminSidebar />

                <main>
                    <SidebarTrigger />
                    <div className="flex flex-col w-full flex-1 overflow-hidden">
                        <main className="flex-1 relative overflow-y-auto focus:outline-none">
                            <div className="py-6 px-4 sm:px-6 md:px-8">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </main>
            </SidebarProvider>
            {/* <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onLogout={handleLogout}
            /> */}
        </div>
    )
}
