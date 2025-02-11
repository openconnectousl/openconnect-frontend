// src/components/common/FilterSection.component.tsx
import React from 'react'
import {
    Search,
    Filter,
    PanelLeftClose,
    PanelLeftOpen,
    GraduationCap,
    SortAsc,
    Scroll,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface FilterSectionProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    facultyFilter: string
    sortBy: string
    onFacultyChange: (value: string) => void
    onSortChange: (value: string) => void
    isOpen: boolean
    onToggle: () => void
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    searchQuery,
    onSearchChange,
    facultyFilter,
    sortBy,
    onFacultyChange,
    onSortChange,
    isOpen,
    onToggle,
}) => {
    return (
        <div
            className={cn(
                'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r',
                'transition-all duration-300 z-40',
                isOpen ? 'w-80' : 'w-16'
            )}
        >
            {/* Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-4 -mr-4 z-40 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={onToggle}
            >
                {isOpen ? (
                    <PanelLeftClose className="h-4 w-4" />
                ) : (
                    <PanelLeftOpen className="h-4 w-4" />
                )}
            </Button>

            {/* Filter Panel */}
            <div
                className={cn(
                    'h-full overflow-hidden',
                    isOpen ? 'opacity-100' : 'opacity-0'
                )}
            >
                <ScrollArea className="h-full px-6 py-4">
                    <div className="space-y-6">
                        <div className="pb-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <Filter className="h-5 w-5" />
                                Filters
                            </h2>
                        </div>
                        <Separator />

                        <div className="space-y-6">
                            {/* Search Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                    Search
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Search by name or title..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        onSearchChange(e.target.value)
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* Faculty Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    Faculty
                                </label>
                                <Select
                                    value={facultyFilter}
                                    onValueChange={onFacultyChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Faculty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Faculties
                                        </SelectItem>
                                        <SelectItem value="Faculty of Computer Engineering">
                                            Computer Engineering
                                        </SelectItem>
                                        <SelectItem value="Faculty of Business Management">
                                            Business Management
                                        </SelectItem>
                                        <SelectItem value="Faculty of Business Management">
                                            Natural Sciences
                                        </SelectItem>
                                        <SelectItem value="Faculty of Science">
                                            Science
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Sort Options */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <SortAsc className="h-4 w-4 text-muted-foreground" />
                                    Sort by
                                </label>
                                <Select
                                    value={sortBy}
                                    onValueChange={onSortChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose sorting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">
                                            Name A-Z
                                        </SelectItem>
                                        <SelectItem value="title">
                                            Title
                                        </SelectItem>
                                        <SelectItem value="faculty">
                                            Faculty
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default FilterSection
