// src/components/ProfessionalNetworkHeader.tsx
import React from 'react';
import { SearchBox } from "./common/SearchBox.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfessionalNetworkHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  facultyFilter: string;
  sortBy: string;
  onFacultyChange: (value: string) => void;
  onSortChange: (value: string) => void;
  totalUsers: number;
  filteredUsers: number;
}

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Your University Network</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {filteredUsers} of {totalUsers} members
                </p>
          </div>        
        <div className="flex items-center gap-4">
          <Select value={facultyFilter} onValueChange={onFacultyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Faculty" />
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

          <SearchBox 
            value={searchQuery}
            onChange={onSearchChange}
            className="w-[320px]"
          />
          </div>
        </div>
      </div>
    </div>
  );
};