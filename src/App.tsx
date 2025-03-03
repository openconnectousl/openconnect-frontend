// src/App.tsx
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AppProvider } from './context/AppContext'
import { Toaster } from './components/common/Toaster.component'
import { QueryProvider } from './context/QueryProvider'

export function App() {
    return (
        <QueryProvider>
            <AppProvider>
                <RouterProvider router={router} />
                <Toaster />
            </AppProvider>
        </QueryProvider>
    )
}
