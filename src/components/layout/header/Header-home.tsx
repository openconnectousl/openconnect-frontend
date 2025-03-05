import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeaderHome: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between flex-wrap md:flex-nowrap sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 left-0 right-0">
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
                {/* Buttons Section (Right Side) */}
                <div className="hidden md:flex items-center space-x-4 md:space-x-4 md:ml-auto flex-wrap w-full sm:w-auto">
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
                        onClick={() => {
                            navigate('/auth/login')
                        }}
                        variant="outline"
                        className="rounded-2xl px-6"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('/auth/signup')
                        }}
                        className="rounded-2xl px-6"
                    >
                        Sign Up
                    </Button>
                </div>

                {/* Hamburger Menu Button */}
                {isMobileMenuOpen ? (
                    // Close Button when Mobile Menu is Open
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 outline outline-1 outline-blue-700"
                        aria-label="Toggle Menu"
                    >
                        <X />
                    </button>
                ) : (
                    // Menu Button when Mobile Menu is Closed
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg bg-slate-50 hover:bg-gray-100 outline outline-1 outline-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
                        aria-label="Toggle Menu"
                    >
                        <Menu />
                    </button>
                )}
            </header>

            {/* Dropdown List- Hamburger Menu */}
            <div className="border-y-2">
                {isMobileMenuOpen && (
                    <div className="absolute left-0 w-full bg-white shadow-lg z-50 md:hidden">
                        <div className="flex flex-col space-y-4 px-6 py-4">
                            <Button
                                onClick={() => {
                                    navigate('/auth/login')
                                }}
                                variant="outline"
                                className="rounded-2xl px-6 w-full"
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('/auth/signup')
                                }}
                                className="rounded-2xl px-6 w-full"
                            >
                                Sign Up
                            </Button>
                            <div className="border-t">
                                <ul className="flex flex-col font-medium mt-4 gap-2 pb-2">
                                    <li className="border-b">
                                        <a
                                            href="#hero-section"
                                            className="flex items-center p-2 hover:bg-slate-100 rounded"
                                        >
                                            Let's Start
                                        </a>
                                    </li>
                                    <li className="border-b">
                                        <a
                                            href="#features"
                                            className="flex items-center p-2 hover:bg-slate-100 rounded"
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li className="border-b">
                                        <a
                                            href="#about"
                                            className="flex items-center p-2 hover:bg-slate-100 rounded"
                                        >
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default HeaderHome
