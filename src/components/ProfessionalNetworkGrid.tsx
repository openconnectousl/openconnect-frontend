import { useState } from "react"
import { FilterSection } from "./common/FilterSection.component"
import { SearchBar } from "./common/SearchBar.component"
import { GridLayout } from "./layout/GridLayout.component"
import { ProfessionalNetworkGridProps } from "@/types"

  export const ProfessionalNetworkGrid: React.FC<ProfessionalNetworkGridProps> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [facultyFilter, setFacultyFilter] = useState('all')
    const [sortBy, setSortBy] = useState('name')
  
    const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFaculty = facultyFilter === 'all' || user.faculty === facultyFilter
      return matchesSearch && matchesFaculty
    })
  
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Professional Network</h1>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
  
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <FilterSection 
              facultyFilter={facultyFilter}
              sortBy={sortBy}
              onFacultyChange={setFacultyFilter}
              onSortChange={setSortBy}
            />
          </div>
        </div>
  
        <GridLayout users={filteredUsers} />
      </div>
    )
  }