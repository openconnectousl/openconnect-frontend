import React, { useState } from 'react'
import { useProfilesWithIdeas } from '@/hooks/useProfilesWithIdeas'
import { ProfessionalNetworkGrid } from '@/components/ProfessionalNetworkGrid'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { LoadingScreen } from '@/components/common/LoadingScreen'

const Community: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [facultyFilter, setFacultyFilter] = useState('all')
    const [sortBy, setSortBy] = useState('name')
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 20
    const offset = (currentPage - 1) * limit

    const { data, isLoading, error } = useProfilesWithIdeas(limit, offset)

    console.log(data)

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    const handleFacultyChange = (value: string) => {
        setFacultyFilter(value)
        setCurrentPage(1) // Reset to first page when filter changes
    }

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const sortedAndFilteredUsers = data?.profiles
        .filter(user => {
            const fullName = `${user.firstname} ${user.lastname}`.toLowerCase()
            return fullName.includes(searchQuery.toLowerCase())
        })
        .filter(user => {
            if (facultyFilter === 'all') return true
            return user.faculty === facultyFilter
        })
        

    // If loading, show spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                <LoadingScreen message="Loading Profiles" />
            </div>
        )
    }

    // If error, show error message
    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Failed to load profiles. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    const users = data?.profiles || []
    console.log("users", users)

    const totalUsers = data?.count || 0

    console.log("totalUsers", totalUsers)
   



    return (
        <div className="container mx-auto p-6">
            {/* <ProfessionalNetworkGrid
                users={users}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                facultyFilter={facultyFilter}
                sortBy={sortBy}
                onFacultyChange={handleFacultyChange}
                onSortChange={handleSortChange}
                filteredUsers={sortedAndFilteredUsers}
                totalCount={totalUsers}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                limit={limit}
            />         */}

            <div >
                <h1 className="text-2xl font-bold mb-4">Community</h1>
                <p className="text-gray-500 mb-4">
                    Connect with other users in the community.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user, index) => (
                    <div key={user.id || `user-${index}`} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="font-semibold">{user.firstname} {user.lastname}</h3>
                        <p className="text-sm text-gray-500">{user.title}</p>
                        {user.avatarURL && (
                            <div className="my-2">
                                <img 
                                    src={`${import.meta.env.VITE_API_URL}${user.avatarURL}`} 
                                    alt={`${user.firstname}'s avatar`}
                                    className="rounded-full w-16 h-16 object-cover"
                                />
                            </div>
                              )}
                              {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
                              {user.faculty && <p className="text-xs text-gray-600 mt-1">{user.faculty}</p>}
                              {user.program && <p className="text-xs text-gray-600">{user.program}</p>}
                              {user.skills && user.skills.length > 0 && (
                                  <div className="mt-2">
                                      <p className="text-xs font-medium">Skills:</p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                          {user.skills.map(skill => (
                                              <span key={skill} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                                  {skill}
                                              </span>
                                          ))}
                                     </div>
                            </div>
                        )}
                    </div>
                ))}
                    {users.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No results found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
                                
    )
}


export default Community
