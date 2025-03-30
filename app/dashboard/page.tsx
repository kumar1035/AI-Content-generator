'use client';
import React, { useState } from 'react';
import SearchSection from './_components/SearchSection';
import TemplateListSection from './_components/TemplateListSection';

const Dashboard = () => {
  const [userSearchInput, setUserInput] = useState<string>(''); // Initialize with an empty string

  return (
    <div>
      {/* Search SECTION */}
      <SearchSection onSearchInput={(value: string) => setUserInput(value)} />
      {/* Template list Section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
};

export default Dashboard;
  