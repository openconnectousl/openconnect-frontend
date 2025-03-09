import React from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
    size?: 'sm' | 'md' | 'lg' | 'full'
    message?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    size = 'full',
    message = 'Loading your profile...',
}) => {
    const logoVariants = {
        animate: {
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
            transition: {
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    }

    const dotVariants = {
        animate: {
            y: ['0%', '-30%', '0%'],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    }

    const containerStyles = {
        sm: 'p-2',
        md: 'p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-sm',
        lg: 'p-8 rounded-xl shadow-lg bg-white/90 backdrop-blur-md',
        full: 'min-h-[80vh] flex-col',
    }

    // Use the network graph as a metaphor for social connections
    const renderNetworkLogo = (
        <div className="relative">
            <svg
                width="64"
                height="64"
                viewBox="0 0 100 100"
                className="text-blue-600"
            >
                <motion.circle
                    cx="50"
                    cy="30"
                    r="12"
                    className="fill-blue-600"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.circle
                    cx="25"
                    cy="65"
                    r="9"
                    className="fill-indigo-500"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.circle
                    cx="75"
                    cy="65"
                    r="9"
                    className="fill-sky-500"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
                <motion.line
                    x1="50"
                    y1="30"
                    x2="25"
                    y2="65"
                    className="stroke-blue-600 stroke-2"
                    initial={{ pathLength: 0, opacity: 0.7 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
                />
                <motion.line
                    x1="50"
                    y1="30"
                    x2="75"
                    y2="65"
                    className="stroke-blue-600 stroke-2"
                    initial={{ pathLength: 0, opacity: 0.7 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
                />
                <motion.line
                    x1="25"
                    y1="65"
                    x2="75"
                    y2="65"
                    className="stroke-blue-600 stroke-2"
                    initial={{ pathLength: 0, opacity: 0.7 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.6 }}
                />
            </svg>
        </div>
    )

    // Loading dots animation
    const renderDots = (
        <div className="flex space-x-1 mt-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-blue-600"
                    variants={dotVariants}
                    animate="animate"
                    custom={i}
                    transition={{
                        delay: i * 0.2,
                        duration: 0.8,
                        repeat: Infinity,
                    }}
                />
            ))}
        </div>
    )

    return (
        <div
            className={`flex items-center justify-center ${containerStyles[size]} ${size === 'full' ? 'h-screen w-full' : ''}`}
        >
            <div className="flex flex-col items-center">
                <motion.div
                    variants={logoVariants}
                    animate="animate"
                    className="mb-4"
                >
                    {renderNetworkLogo}
                </motion.div>

                {message && (
                    <p className="text-slate-700 font-medium text-center mb-2">
                        {message}
                    </p>
                )}

                <div className="flex justify-center">{renderDots}</div>
            </div>
        </div>
    )
}
