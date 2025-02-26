// MobileNavigation.component.tsx
import { navigationItems } from '../navigation-config'
import { Button } from '@/components/ui/button'

interface MobileNavigationProps {
    onClose: () => void
}

export const MobileNavigation: React.FC<MobileNavigationProps> = () => {
    return (
        <div className="flex flex-col gap-2">
            {navigationItems.map((item) => (
                <Button
                    key={item.label}
                    variant="ghost"
                    className={`w-full justify-start ${item.className || ''}`}
                    onClick={item.onClick}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </Button>
            ))}
        </div>
    )
}
