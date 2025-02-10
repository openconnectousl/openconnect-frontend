import { MobileButtons } from "./MobileButtons.component"
import { MobileNavigation } from "./MobileNavigation.component"
import { MobileUserProfile } from "./MobileUserProfile.component"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    user: {
      name: string
      email: string
      avatar: string
    }
  }

export const MobileMenu = ({ isOpen, onClose, user }: MobileMenuProps) => (
    <div className="border-t-2">
      {isOpen && (
        <div className="absolute left-0 w-full bg-white shadow-lg z-50 md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <MobileButtons onClose={onClose} />
            <MobileNavigation onClose={onClose} />
            <MobileUserProfile user={user} onClose={onClose} />
          </div>
        </div>
      )}
    </div>
)