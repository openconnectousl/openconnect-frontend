import { LoadingScreen } from '@/components/common/LoadingScreen'
import { createContext, useContext, useState } from 'react'

interface LoadingContextType {
    isLoading: boolean
    startLoading: (message?: string) => void
    stopLoading: () => void
    loadingMessage: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(
        'Processing your request...'
    )

    const startLoading = (message?: string) => {
        if (message) setLoadingMessage(message)
        setIsLoading(true)
    }

    const stopLoading = () => setIsLoading(false)

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                startLoading,
                stopLoading,
                loadingMessage,
            }}
        >
            {isLoading && <LoadingScreen message={loadingMessage} />}
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context
}
