// src/components/layout/MainLayout.tsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import About from "../ui/About"
import Footer from "../ui/Footer"
import Header from "./header/Header.component"
import { RequestPanel } from "@/components/RequestPanel"
import { FilterSection } from "@/components/common/FilterSection.component"
import { useApp } from '@/context/AppContext'

export const MainLayout = () => {
  const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()
  
  // Add state for filter controls
  const [searchQuery, setSearchQuery] = useState('')
  const [facultyFilter, setFacultyFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        requests={requests}
        isRequestPanelOpen={isRequestPanelOpen}
        setIsRequestPanelOpen={setIsRequestPanelOpen}
      />
      <div className="flex flex-grow relative">
        <FilterSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          facultyFilter={facultyFilter}
          sortBy={sortBy}
          onFacultyChange={setFacultyFilter}
          onSortChange={setSortBy}
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
        />
        <main className={`flex-grow transition-all duration-300 ${isFilterOpen ? 'ml-80' : 'ml-16'}`}>
          <Outlet />
        </main>
      </div>
      <About />
      <Footer />
      <RequestPanel 
        requests={requests}
        isOpen={isRequestPanelOpen}
        onClose={() => setIsRequestPanelOpen(false)}
      />
    </div>
  )
}