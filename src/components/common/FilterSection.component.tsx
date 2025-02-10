import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { Filter } from "lucide-react"

interface FilterSectionProps {
    facultyFilter: string
    sortBy: string
    onFacultyChange: (value: string) => void
    onSortChange: (value: string) => void
  }

export const FilterSection: React.FC<FilterSectionProps> = ({
    facultyFilter,
    sortBy,
    onFacultyChange,
    onSortChange
  }) => (
    <div className="flex gap-4 flex-wrap">
      <Select value={facultyFilter} onValueChange={onFacultyChange}>
        <SelectTrigger className="w-[180px]">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filter by Faculty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Faculties</SelectItem>
          <SelectItem value="Faculty of Computer Engineering">Computer Engineering</SelectItem>
          <SelectItem value="Faculty of Business Management">Business Management</SelectItem>
          <SelectItem value="Faculty of Science">Science</SelectItem>
        </SelectContent>
      </Select>
  
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name A-Z</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="faculty">Faculty</SelectItem>
        </SelectContent>
      </Select>
    </div>
)
