'use client'

import type React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeaderHome: React.FC = () => {
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-6">
                {/* Logo Section */}
                <div className="flex">
                    <a
                        href="#"
                        className="flex flex-col space-y-0.5 pl-0 pr-4 transition-colors hover:opacity-90"
                    >
                        <p className="text-blue-600 text-2xl font-semibold tracking-tight">
                            OpenConnect
                        </p>
                        <p className="text-muted-foreground text-xs leading-tight">
                            Idea Sharing & Collaboration Platform
                        </p>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4 ml-auto">
                    <div className="space-x-5 pr-2 lg:space-x-8 lg:px-10">
                        <a
                            href="#hero-section"
                            className="text-base font-semibold transition-colors hover:text-primary"
                        >
                            Let's Start
                        </a>
                        <a
                            href="#features"
                            className="text-base font-semibold transition-colors hover:text-primary"
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="text-base font-semibold transition-colors hover:text-primary"
                        >
                            About
                        </a>
                    </div>
                    <Button
                        onClick={() => navigate('/auth/login')}
                        variant="outline"
                        className="rounded-2xl px-6"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => navigate('/auth/signup')}
                        className="rounded-2xl px-6"
                    >
                        Sign Up
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden rounded-lg bg-transparent"
                        >
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[400px]">
                        <div className="flex flex-col space-y-4 mt-6">
                            {/* Auth Buttons */}
                            <Button
                                onClick={() => navigate('/auth/login')}
                                variant="outline"
                                className="rounded-2xl px-6 w-full"
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => navigate('/auth/signup')}
                                className="rounded-2xl px-6 w-full"
                            >
                                Sign Up
                            </Button>

                            {/* Navigation Links */}
                            <div className="border-t pt-4">
                                <ul className="flex flex-col font-medium gap-2">
                                    <li className="border-b pb-2">
                                        <a
                                            href="#hero-section"
                                            className="flex items-center p-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
                                        >
                                            Let's Start
                                        </a>
                                    </li>
                                    <li className="border-b pb-2">
                                        <a
                                            href="#features"
                                            className="flex items-center p-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li className="border-b pb-2">
                                        <a
                                            href="#about"
                                            className="flex items-center p-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
                                        >
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default HeaderHome
