import { Toaster as ToastProvider } from 'react-hot-toast'

export const Toaster: React.FC = () => {
    return (
        <ToastProvider
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#fff',
                    color: '#363636',
                    border: '1px solid #e2e8f0',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
                success: {
                    iconTheme: {
                        primary: '#059669',
                        secondary: '#fff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#dc2626',
                        secondary: '#fff',
                    },
                },
            }}
        />
    )
}
