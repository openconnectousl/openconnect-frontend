// src/components/layout/header/Logo.component.tsx
import { Link } from 'react-router-dom'

export const AdminLogo = () => (
    <Link
        to="/"
        className="flex flex-col space-y-0.5 pl-0 pr-4 transition-colors hover:opacity-90"
    >
        <p className="text-blue-600 text-2xl font-semibold tracking-tight">
            OpenConnect
        </p>
        <p className="text-muted-foreground text-xs leading-tight">
            Idea Sharing & Collaboration Platform
        </p>
    </Link>
)
