export interface UserProfile {
  id: number;
  name: string;
  title: string;
  faculty: string;
  program: string;
  image: string;
}

export interface ProfessionalNetworkGridProps {
  users: UserProfile[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSidebarOpen: boolean;
  filteredUsers: UserProfile[];
}

export interface RouterContext {
  requests: Array<{
    id: number
    name: string
    title: string
    image: string
  }>
  users: UserProfile[]
  isRequestPanelOpen: boolean
  setIsRequestPanelOpen: (isOpen: boolean) => void
}

export interface SearchParams {
    query: string
    page: number
    limit: number
}