import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { ProfessionalNetworkGrid } from '@/components/ProfessionalNetworkGrid';
import { useApp } from '@/context/AppContext';

const Home: React.FC = () => {
  const { users } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };



  const filteredUsers = users.filter((user: UserProfile) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <ProfessionalNetworkGrid
        users={users}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filteredUsers={filteredUsers}
      />
    </div>
  );
};

export default Home;
