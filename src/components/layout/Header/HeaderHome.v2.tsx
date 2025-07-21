'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ArrowRight, ArrowUpRight, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeaderHome: React.FC = () => {
    const [open, setOpen] = React.useState(false)

    const navigate = useNavigate()

    const handleNavClick = (href: string) => {
        if (href.startsWith('#')) {
            // Anchor navigation
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            navigate(href)
        }
        setOpen(false)
    }

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

                    <div className="hidden md:flex  items-center space-x-4">
                        <Button
                            onClick={() => navigate('/auth/signup')}
                            size={'lg'}
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Mobile Nav */}
                    <Sheet open={open} onOpenChange={setOpen}>
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
                            side="bottom"
                            className="w-full p-6 backdrop-blur-sm bg-white/90"
                        >
                            <div className="flex flex-col py-10 space-y-6">
                                {/* Auth Buttons */}
                                <div className="flex space-x-4">
                                    <Button
                                        variant="outline"
                                        className="w-full px-6"
                                        onClick={() =>
                                            handleNavClick('/auth/login')
                                        }
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        className="w-full px-6"
                                        onClick={() =>
                                            handleNavClick('/auth/signup')
                                        }
                                    >
                                        Sign Up
                                    </Button>
                                </div>

                                {/* Nav Links */}
                                <nav>
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
                                                <button
                                                    onClick={() =>
                                                        handleNavClick(href)
                                                    }
                                                    className="w-full text-left rounded px-3 flex justify-between items-center py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                                                >
                                                    {label}
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </button>
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
