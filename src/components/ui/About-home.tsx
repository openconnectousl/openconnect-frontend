import { FacebookIcon, GithubIcon, Linkedin, Twitter } from 'lucide-react'

const AboutHome: React.FC = () => {
    return (
        <div id="about" className="bg-white py-8 border-t">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 md:gap-20 text-gray-800">
                {/* Section 1: OpenConnect Description */}
                <div className="md:col-span-2 p-6 md:mr-8">
                    <p className="text-blue-600 text-2xl font-semibold">
                        OpenConnect
                    </p>
                    <p className="text-black-600 text-xs mb-4 font-medium">
                        Idea Sharing & Collaboration Platform
                    </p>
                    <p className="text-sm text-gray-600 text-justify">
                        OpenConnect is an innovative online platform designed
                        for The Open University of Sri Lanka's diverse academic
                        community. It bridges the gap in "Open and Distance
                        Learning (ODL)" by fostering idea sharing,
                        collaboration, and networking among students and staff.
                        This platform empowers users to connect, exchange
                        feedback, and collaborate, overcoming the challenges of
                        physical distance.
                    </p>
                </div>

                {/* Section 2: Pages */}
                <div className="flex flex-col md:col-span-1 items-start p-6">
                    <h3 className="font-bold mb-4">Pages</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#hero-section" className="hover:underline">
                                Let's Start
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="hover:underline">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/auth/login" className="hover:underline">
                                Sign In
                            </a>
                        </li>
                        <li>
                            <a href="/auth/signup" className="hover:underline">
                                Sign Up
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Connect */}
                <div className="flex flex-col md:col-span-1 items-start p-6">
                    <h3 className="font-bold mb-4">Connect</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <a href="#" className="hover:underline">
                                <i className="items-center fab fa-twitter hover:text-blue-700">
                                    <Twitter className="inline-block size-4" />{' '}
                                    Twitter
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                <i className="items-center fab fa-github hover:text-blue-700">
                                    <GithubIcon className="inline-block size-4" />{' '}
                                    GitHub
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                <i className="items-center fab fa-linkedin hover:text-blue-700">
                                    <Linkedin className="inline-block size-4" />{' '}
                                    LinkedIn
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                <i className="fab fa-facebook hover:text-blue-700">
                                    <FacebookIcon className="inline-block size-4" />{' '}
                                    Facebook
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutHome
