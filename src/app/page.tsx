import React, { useState } from 'react'
import { UserProfile } from '@/types'
import { ProfessionalNetworkGrid } from '@/components/ProfessionalNetworkGrid'
import { useApp } from '@/context/AppContext'

const Home: React.FC = () => {
    const { users } = useApp()
    const [searchQuery, setSearchQuery] = useState('')
    const [facultyFilter, setFacultyFilter] = useState('all')
    const [sortBy, setSortBy] = useState('name')

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    const handleFacultyChange = (value: string) => {
        setFacultyFilter(value)
    }

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const filteredUsers = users.filter((user: UserProfile) => {
        const matchesSearch = user.name
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
                return a.name.localeCompare(b.name)
            case 'title':
                return a.title.localeCompare(b.title)
            case 'faculty':
                return a.faculty.localeCompare(b.faculty)
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
            />
        </div>
    )
}

export default Home
