import { Search } from 'lucide-react'
import { Input } from '../ui/input'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
    <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
            type="text"
            placeholder="Search by name or title..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-9 w-full"
        />
    </div>
)
