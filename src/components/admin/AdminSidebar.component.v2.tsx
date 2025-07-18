'use client'

import { useLocation, Link } from 'react-router-dom'
import {
    LayoutDashboard,
    Lightbulb,
    Users,
    Settings,
    LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar'
import { AdminLogo } from './AdminLogo.component'
import { useAuth } from '@/context/AuthContext'

interface AdminSidebarProps {}

const navigation = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { name: 'Ideas', to: '/admin/ideas', icon: Lightbulb },
    { name: 'Users', to: '/admin/users', icon: Users },
    { name: 'Settings', to: '/admin/settings', icon: Settings },
]

export function AdminSidebar({}: AdminSidebarProps) {
    const location = useLocation()

    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <Sidebar className="h-screen">
                <SidebarContent>
                    <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
                        <AdminLogo />
                    </div>

                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigation.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={
                                                location.pathname === item.to
                                            }
                                        >
                                            <Link to={item.to}>
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <div className="mt-auto p-4 border-t dark:border-gray-700">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:bg-red-100"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-5 w-5" />
                            Sign out
                        </Button>
                    </div>
                </SidebarContent>
            </Sidebar>
        </>
    )
}
