import React from 'react'
import { SearchBox } from './common/SearchBox.component'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ProfessionalNetworkHeaderProps } from '@/types'

export const NetworkHeader: React.FC<ProfessionalNetworkHeaderProps> = ({
    searchQuery,
    onSearchChange,
    facultyFilter,
    sortBy,
    onFacultyChange,
    onSortChange,
    totalUsers,
    filteredUsers,
}) => {
    return (
        <div className="sticky top-16 bg-white/95 backdrop-blur z-40 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col space-y-4">
                    {/* Header section */}
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                                Your University Network
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Showing {filteredUsers} of {totalUsers} members
                            </p>
                        </div>

                        {/* Desktop search box */}
                        <div className="hidden md:block md:mr-16">
                            <SearchBox
                                value={searchQuery}
                                onChange={onSearchChange}
                                className="w-[320px]"
                            />
                        </div>
                    </div>

                    {/* Mobile search and filters */}
                    <div className="md:hidden space-y-4">
                        <SearchBox
                            value={searchQuery}
                            onChange={onSearchChange}
                            className="w-full"
                        />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters & Sort
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="bottom"
                                className="h-[100dvh] px-0 max-w-none"
                            >
                                <div className="h-full flex flex-col">
                                    {/* Sheet Header */}
                                    <SheetHeader className="px-4 py-4 border-b">
                                        <div className="flex items-center justify-between">
                                            <SheetTitle className="text-lg font-semibold">
                                                Filters & Sort
                                            </SheetTitle>
                                            <SheetClose asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </SheetClose>
                                        </div>
                                    </SheetHeader>

                                    {/* Sheet Content */}
                                    <div className="flex-1 overflow-y-auto">
                                        <div className="px-4 py-6 space-y-6">
                                            {/* Faculty Filter Section */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-medium text-muted-foreground">
                                                    Faculty
                                                </h4>
                                                <Select
                                                    value={facultyFilter}
                                                    onValueChange={
                                                        onFacultyChange
                                                    }
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
                                                        <SelectItem value="Faculty of Science">
                                                            Science
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <Separator />

                                            {/* Sort Section */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-medium text-muted-foreground">
                                                    Sort By
                                                </h4>
                                                <Select
                                                    value={sortBy}
                                                    onValueChange={onSortChange}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Sort by" />
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

                                    {/* Sheet Footer */}
                                    <div className="border-t px-4 py-4 bg-white">
                                        <SheetClose asChild>
                                            <Button className="w-full">
                                                Apply Filters
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop filters */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Select
                            value={facultyFilter}
                            onValueChange={onFacultyChange}
                        >
                            <SelectTrigger className="w-[180px]">
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
                                <SelectItem value="Faculty of Science">
                                    Science
                                </SelectItem>
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
                </div>
            </div>
        </div>
    )
}
