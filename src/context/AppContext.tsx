// src/context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { UserProfile } from '@/types'

interface AppContextType {
  requests: Array<{
    id: number
    name: string
    title: string
    image: string
  }>
  users: UserProfile[]
  isRequestPanelOpen: boolean
  setIsRequestPanelOpen: (isOpen: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false)

  const requests = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Software Engineer',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Product Manager',
      image: 'https://github.com/shadcn.png',
    },
  ]

  const users: UserProfile[] = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Software Engineer',
      faculty: 'Faculty of Computer Engineering',
      program: 'Computer Engineering',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Product Manager',
      faculty: 'Faculty of Business',
      program: 'Business Management',
      image: 'https://github.com/shadcn.png',
    },
  ]

  return (
    <AppContext.Provider 
      value={{ 
        requests, 
        users, 
        isRequestPanelOpen, 
        setIsRequestPanelOpen 
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}