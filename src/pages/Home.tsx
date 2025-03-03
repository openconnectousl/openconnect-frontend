import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, Users, Globe, Lightbulb, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Connect, Collaborate, Create Together
                            </h1>
                            <p className="text-lg md:text-xl text-blue-100">
                                Join the OpenConnect community and discover
                                meaningful connections with professionals and
                                mentors in your field.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="text-base py-6 px-8 bg-white text-blue-700 hover:bg-blue-50"
                                    onClick={() => {
                                        navigate('/auth/login')
                                    }}
                                >
                                    Let's Start Connecting{' '}
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-base py-6 px-8 border-white text-white hover:bg-white/10"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <div className="relative w-full md:w-1/2 h-64 md:h-96">
                            <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-30"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose OpenConnect?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're building the network that helps professionals
                            connect, grow, and achieve more together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Meaningful Connections
                            </h3>
                            <p className="text-gray-600">
                                Connect with like-minded professionals who share
                                your interests and goals.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow">
                            <div className="bg-indigo-100 p-4 rounded-full mb-4">
                                <Globe className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Global Community
                            </h3>
                            <p className="text-gray-600">
                                Join a worldwide network of professionals across
                                various industries.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow">
                            <div className="bg-purple-100 p-4 rounded-full mb-4">
                                <Lightbulb className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Share Ideas
                            </h3>
                            <p className="text-gray-600">
                                Exchange innovative ideas and get feedback from
                                industry experts.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <Calendar className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Events & Meetups
                            </h3>
                            <p className="text-gray-600">
                                Participate in virtual and in-person events to
                                expand your network.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to grow your professional network?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Join thousands of professionals who are already
                        connecting, collaborating, and growing together.
                    </p>
                    <Button className="text-lg py-6 px-10 bg-white text-blue-700 hover:bg-blue-50"  onClick={() => {
                                        navigate('/auth/signup')
                                    }}>
                        Sign Up Now <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Home
