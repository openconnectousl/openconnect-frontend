'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeaderHome: React.FC = () => {
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        className="flex flex-col space-y-0.5 transition-opacity hover:opacity-90"
                    >
                        <p className="text-2xl font-semibold tracking-tight text-blue-600">
                            OpenConnect
                        </p>
                        <p className="text-xs leading-tight text-muted-foreground">
                            Idea Sharing & Collaboration Platform
                        </p>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#hero-section"
                            className="font-semibold text-base transition-colors hover:text-primary"
                        >
                            Let's Start
                        </a>
                        <a
                            href="#features"
                            className="font-semibold text-base transition-colors hover:text-primary"
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="font-semibold text-base transition-colors hover:text-primary"
                        >
                            About
                        </a>
                    </nav>

                    {/* Buttons */}
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            className=" px-6"
                            onClick={() => navigate('/auth/login')}
                        >
                            Sign In
                        </Button>
                        <Button
                            className="px-6"
                            onClick={() => navigate('/auth/signup')}
                        >
                            Sign Up
                        </Button>
                    </div>

                    {/* Mobile Nav */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden rounded-lg bg-transparent"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full max-w-sm p-6"
                        >
                            <div className="flex flex-col space-y-6">
                                {/* Auth Buttons */}
                                <Button
                                    variant="outline"
                                    className="w-full  px-6"
                                    onClick={() => navigate('/auth/login')}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className="w-full px-6"
                                    onClick={() => navigate('/auth/signup')}
                                >
                                    Sign Up
                                </Button>

                                {/* Nav Links */}
                                <nav className="border-t pt-6">
                                    <ul className="flex flex-col gap-3 font-medium">
                                        {[
                                            {
                                                href: '#hero-section',
                                                label: "Let's Start",
                                            },
                                            {
                                                href: '#features',
                                                label: 'Features',
                                            },
                                            { href: '#about', label: 'About' },
                                        ].map(({ href, label }) => (
                                            <li
                                                key={href}
                                                className="border-b pb-2 last:border-0 last:pb-0"
                                            >
                                                <a
                                                    href={href}
                                                    className="block rounded px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                                                >
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default HeaderHome
