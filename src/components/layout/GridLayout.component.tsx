import { UserProfile } from "@/types"
import { ProfileCard } from "../ProfileCard"

interface GridLayoutProps {
    users: UserProfile[]
  }
  
  export const GridLayout: React.FC<GridLayoutProps> = ({ users }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map((user) => (
        <ProfileCard key={user.id} user={user} />
      ))}
    </div>
  )
  