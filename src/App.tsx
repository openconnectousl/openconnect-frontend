// src/App.tsx
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AppProvider } from './context/AppContext'

export function App() {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    )
}
