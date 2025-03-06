import React, { useState } from 'react'
import { useProfilesWithIdeas } from '@/hooks/useProfilesWithIdeas'
import { ProfessionalNetworkGrid } from '@/components/ProfessionalNetworkGrid'
import { Spinner } from '@/components/Spinner/Spinner.component'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

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
    
    // If loading, show spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                <LoadingScreen message="Loading" />
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
    const totalUsers = data?.count || 0
    
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
        const userName = user.name || fullName;
        
        const matchesSearch = userName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        const matchesFaculty =
            facultyFilter === 'all' || user.faculty === facultyFilter
        return matchesSearch && matchesFaculty
    })

    // Sort users based on sortBy value
    const sortedAndFilteredUsers = [...filteredUsers].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                const nameA = a.name || `${a.firstname || ''} ${a.lastname || ''}`.trim()
                const nameB = b.name || `${b.firstname || ''} ${b.lastname || ''}`.trim()
                return nameA.localeCompare(nameB)
            case 'title':
                return (a.title || '').localeCompare(b.title || '')
            case 'faculty':
                return (a.faculty || '').localeCompare(b.faculty || '')
            default:
                return 0
        }
    })

    return (
        <div className="container mx-auto p-6">
            <ProfessionalNetworkGrid
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
            />
        </div>
    )
}

export default Community