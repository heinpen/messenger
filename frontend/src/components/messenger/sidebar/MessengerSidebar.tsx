'use client';

import SearchInput from '@/components/ui/SearchInput';
import Tabs from '@/components/ui/Tabs';
import { sidebarTabs } from '@/data';
import useUser from '@/hooks/useUser';

import { useState, type FC } from 'react';

interface MessengerSidebarProps {}

const MessengerSidebar: FC<MessengerSidebarProps> = ({}) => {
  const { data, error, isLoading } = useUser();

  const [tabs, setTabs] = useState(sidebarTabs);

  const handleTabClick = (id: number) => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (id === tab.id) {
          return { ...tab, current: true };
        } else {
          return { ...tab, current: false };
        }
      }),
    );
  };

  const handleSearchChange = (query: string) => {
      
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          {/* <Image
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
            width={1}
            height={1}
          /> */}
          {data && (
            <p className="text-gray-300 hover:bg-gray-700 hover:text-white">
              {data.username}
            </p>
          )}
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="px-4 py-4">
            <Tabs
              tabs={tabs}
              className={''}
              handleClick={handleTabClick}
            ></Tabs>
            <SearchInput />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default MessengerSidebar;
