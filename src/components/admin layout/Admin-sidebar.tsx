'use client'

import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    LayoutDashboard,
    Lightbulb,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AdminLogo } from './AdminLogo.component'

interface AdminSidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdminSidebar({
    sidebarOpen,
    setSidebarOpen,
}: AdminSidebarProps) {
    const location = useLocation()

    const navigation = [
        { name: 'Dashboard', to: '/', icon: LayoutDashboard },
        { name: 'Ideas', to: '/admin-ideas', icon: Lightbulb },
        { name: 'Users', to: '/admin-users', icon: Users },
        { name: 'Settings', to: '/admin-settings', icon: Settings },
    ]

    return (
        <>
            {/* Mobile sidebar toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 outline outline-1 outline-blue-700"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <X /> : <Menu />}
                <span className="sr-only">Toggle sidebar</span>
            </button>

            <div
                className="fixed inset-0 flex md:hidden"
                role="dialog"
                aria-modal="true"
                style={{ zIndex: sidebarOpen ? 40 : 0 }}
            >
                {/* Sidebar backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        aria-hidden="true"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Mobile sidebar */}
                <div
                    className={cn(
                        'relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out',
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    )}
                >
                    <div className="flex-1 h-0 pt-20 pb-4 overflow-y-auto mx-2">
                        <div className="flex-shrink-0 flex items-center px-4 mb-8">
                            <AdminLogo />
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={cn(
                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                        location.pathname === item.to ||
                                            (item.to !== '/' &&
                                                location.pathname.startsWith(
                                                    item.to
                                                ))
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <item.icon
                                        className="mr-4 h-5 w-5 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-300 dark:border-gray-700 p-4">
                        <Button
                            variant="secondary"
                            className="flex items-center w-full text-red-600 bg-slate-300/40 hover:bg-slate-200"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex lg:flex-shrink-0">
                <div className="flex flex-col max-w-xs w-full">
                    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex items-center h-20 flex-shrink-0 px-4 py-8 border-b border-gray-300 dark:border-gray-700">
                            <AdminLogo />
                        </div>
                        <div className="flex-1 flex flex-col overflow-y-auto mx-2">
                            <nav className="flex-1 px-2 py-4 space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={cn(
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                            location.pathname === item.to ||
                                                (item.to !== '/' &&
                                                    location.pathname.startsWith(
                                                        item.to
                                                    ))
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                        )}
                                    >
                                        <item.icon
                                            className="mr-3 h-5 w-5 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-300 dark:border-gray-700 p-4">
                            <Button
                                variant="secondary"
                                className="flex items-center w-full text-red-600 bg-slate-300/40 hover:bg-slate-200"
                            >
                                <LogOut className="h-5 w-5" />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
