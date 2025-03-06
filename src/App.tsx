import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { AppProvider } from './context/AppContext'
import { Toaster } from './components/common/Toaster.component'
import { QueryProvider } from './context/QueryProvider'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './context/LoadingContext'

export function App() {
    return (
        <QueryProvider>
            <BrowserRouter>
                <LoadingProvider>
                    <AuthProvider>
                        <AppProvider>
                            <Router/>
                            <Toaster />
                        </AppProvider>
                    </AuthProvider>
                </LoadingProvider>
            </BrowserRouter>
        </QueryProvider>
    )
}