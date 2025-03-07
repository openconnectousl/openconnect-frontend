import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, Users, Globe, Lightbulb, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ForHomeImage from '@/assets/images/auth/ForHome.svg'
import { Card } from '@/components/ui/card'
import Footer from '@/components/ui/Footer'
import HeaderHome from '@/components/layout/header/Header-home'
import AboutHome from '@/components/ui/About-home'

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
                        <HeaderHome />

            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section
                    id="hero-section"
                    className="bg-gradient-to-r from-slate-50 to-slate-100 py-20"
                >
                    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                        <div className="flex items-center justify-center gap-6 md:gap-10 font-inter">
                            <div className="max-w-2xl space-y-7 md:ml-6 lg:ml-10">
                                <h1 className="text-blue-600 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Connect, Collaborate, Create Together
                                </h1>
                                <p className="text-lg md:text-lg text-blue-900 text-justify">
                                    Join the OpenConnect community and discover
                                    meaningful connections with professionals
                                    and mentors in your field.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        className="text-base py-6 px-8"
                                        onClick={() => navigate('/auth/login')}
                                    >
                                        Let's Start Connecting{' '}
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                    <Button
                                        className="text-base py-6 px-8"
                                        onClick={() => navigate('/community')}
                                    >
                                        Browse the Community
                                    </Button>
                                </div>
                            </div>
                            <div className="relative hidden md:flex items-center justify-center">
                                <div className="w-5/6 h-5/6 flex items-center justify-center">
                                    <img
                                        src={ForHomeImage}
                                        alt="OpenConnect"
                                        className="max-w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-gray-50/20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Why Choose OpenConnect?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                We're building the network that helps
                                professionals connect, grow, and achieve more
                                together.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                            {[
                                {
                                    icon: Users,
                                    title: 'Meaningful Connections',
                                    description:
                                        'Connect with like-minded professionals who share your interests and goals.',
                                    bgColor: 'bg-blue-100',
                                    textColor: 'text-blue-600',
                                },
                                {
                                    icon: Globe,
                                    title: 'Global Community',
                                    description:
                                        'Join a worldwide network of professionals across various industries.',
                                    bgColor: 'bg-blue-100',
                                    textColor: 'text-blue-600',
                                },
                                {
                                    icon: Lightbulb,
                                    title: 'Share Ideas',
                                    description:
                                        'Exchange innovative ideas and get feedback from industry experts.',
                                    bgColor: 'bg-purple-100',
                                    textColor: 'text-purple-600',
                                },
                                {
                                    icon: Calendar,
                                    title: 'Events & Meetups',
                                    description:
                                        'Participate in virtual and in-person events to expand your network.',
                                    bgColor: 'bg-blue-100',
                                    textColor: 'text-blue-600',
                                },
                            ].map((feature, index) => (
                                <Card
                                    key={index}
                                    className="relative overflow-hidden border-0 bg-gradient-to-t from-white to-slate-50/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div
                                            className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto transform transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <feature.icon
                                                className={`w-8 h-8 ${feature.textColor}`}
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 border border-blue-100 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-16">
                    <div className="container mx-auto px-4 md:px-6 text-center py-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to grow your professional network?
                        </h2>
                        <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
                            Join thousands of professionals who are already
                            connecting, collaborating, and growing together.
                        </p>
                        <Button
                            className="text-base py-6 px-10"
                            onClick={() => {
                                navigate('/auth/signup')
                            }}
                        >
                            Sign Up Now{' '}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </section>
            </div>
            <AboutHome />
            <Footer />
        </>
    )
}

export default Home
