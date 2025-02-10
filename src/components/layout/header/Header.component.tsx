import React, { useState } from 'react'
import { Logo } from './Logo.component'
import { NavButtons } from './NavButtons.component'
import { UserProfile } from './UserProfile.component'
import { MobileMenu } from './Mobile/MobileMenu.component'
import { MobileMenuButton } from './Mobile/MobileMenuButton.component'

interface HeaderProps {
  requests: Array<{
    id: number
    name: string
    title: string
    image: string
  }>
  isRequestPanelOpen: boolean
  setIsRequestPanelOpen: (isOpen: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ requests, setIsRequestPanelOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const user = {
    name: 'Pasindu Bandara',
    email: 'pasindumadusanka526@gmail.com',
    avatar: 'https://github.com/shadcn.png',
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavButtons
            requests={requests}
            setIsRequestPanelOpen={setIsRequestPanelOpen}
          />

          <UserProfile user={user} />

          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
      />
    </header>
  )
}

export default Header