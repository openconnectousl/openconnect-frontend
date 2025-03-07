import { ProfileCardWithIdeas } from '@/components/ProfileCardWithIdeas'
import { UserProfileWithIdeas } from '@/hooks/useProfilesWithIdeas'

interface GridLayoutProps {
    users: UserProfileWithIdeas[]
}

export const GridLayout = ({ users }: GridLayoutProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
                <ProfileCardWithIdeas key={user.id} user={user} />
            ))}
        </div>
    )
}
