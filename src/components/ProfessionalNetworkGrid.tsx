import { GridLayout } from "./layout/GridLayout.component"
import { ProfessionalNetworkGridProps } from "@/types"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchBox } from "./common/SearchBox.component"

interface ExtendedProfessionalNetworkGridProps extends ProfessionalNetworkGridProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  isSidebarOpen: boolean
  filteredUsers: Array<{
    id: number
    name: string
    title: string
    faculty: string
    program: string
    image: string
  }>
}

export const ProfessionalNetworkGrid: React.FC<ExtendedProfessionalNetworkGridProps> = ({ 
  users,
  searchQuery,
  onSearchChange,
  isSidebarOpen,
  filteredUsers
}) => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 overflow-hidden",
        isSidebarOpen ? "ml-80" : "ml-16"
      )}>
        {/* Sticky Header with Search */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Your University Network</h1>
              <p className="text-muted-foreground mt-2">
                Showing {filteredUsers.length} of {users.length} members
              </p>
            </div>
            <SearchBox 
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <GridLayout users={filteredUsers} />
            
            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No results found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}






















































































































































































































