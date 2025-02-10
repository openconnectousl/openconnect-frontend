// src/components/layout/header/Logo.component.tsx
import { Link } from '@tanstack/react-router'

export const Logo = () => (
  <Link 
    to="/"
    className="flex flex-col space-y-0.5 px-4 transition-colors hover:opacity-90"
    activeProps={{ className: 'text-blue-700' }}
  >
    <p className="text-blue-600 text-2xl font-semibold tracking-tight">
      OpenConnect
    </p>
    <p className="text-muted-foreground text-xs max-w-[12rem] leading-tight">
      Idea Sharing & Collaboration Platform
    </p>
  </Link>
)