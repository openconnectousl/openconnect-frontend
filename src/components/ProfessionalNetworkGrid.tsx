// src/components/ProfessionalNetworkGrid.tsx
import { GridLayout } from './layout/GridLayout.component'
import { ProfessionalNetworkGridProps } from '@/types'
import { NetworkHeader } from './NetworkHeader'

export const ProfessionalNetworkGrid: React.FC<
    ProfessionalNetworkGridProps
> = ({
    users,
    searchQuery,
    onSearchChange,
    facultyFilter,
    sortBy,
    onFacultyChange,
    onSortChange,
    filteredUsers,
}) => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))]">
            <NetworkHeader
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                facultyFilter={facultyFilter}
                sortBy={sortBy}
                onFacultyChange={onFacultyChange}
                onSortChange={onSortChange}
                totalUsers={users.length}
                filteredUsers={filteredUsers.length}
            />

            <div className="flex-1 overflow-auto py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <GridLayout users={filteredUsers} />

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No results found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
