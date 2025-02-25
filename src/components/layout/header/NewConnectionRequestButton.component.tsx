import { UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip'

interface ConnectionRequestButtonProps {
  count: number;
  onClick: () => void;
}

export const ConnectionRequestButton: React.FC<ConnectionRequestButtonProps> = ({ count, onClick }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="outline" 
          className="relative"
          onClick={onClick}
        >
          <UsersRound className="h-5 w-5" />
          {count > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 px-2 min-w-[20px] h-5"
            >
              {count}
            </Badge>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Connection Requests</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

