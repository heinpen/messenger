'use client';

import SearchInput from '@/components/ui/SearchInput';
import Tabs from '@/components/ui/Tabs';
import { sidebarTabs } from '@/data';
import { useDebounce } from '@/hooks';
import { useGetUsers, useSearchUsers, useUser } from '@/hooks/api';
import { User } from '@/types';
import { debounce } from '@/utils';

import { useState, type FC } from 'react';

interface MessengerSidebarProps {}

const MessengerSidebar: FC<MessengerSidebarProps> = ({}) => {
  const { data, error, isLoading } = useUser();

  const [searchUsersQuery, setSearchUsersQuery] = useState('');

  const [searchChatsQuery, setSearchChatsQuery] = useState('');

  const { data: usersData, error: usersError } = useGetUsers();


  const { data: searchUsersData, error: searchUsersError } =
    useSearchUsers(searchUsersQuery);

  // const { data: searchChatsData, error: searchChatsError } =
  //   useSearchUsers(searchUsersQuery);

  const [tabs, setTabs] = useState(sidebarTabs);
  const [currentTab, setCurrentTab] = useState<string>(
    tabs.reduce(
      (acc, tab) => (tab.current ? tab.name : acc),
      tabs[0].name as string,
    ),
  );

  const handleSearchChange = useDebounce((query: string) => {
    if (currentTab === 'chats') {
      setSearchChatsQuery(query);
    } else {
      setSearchUsersQuery(query);
    }
  }, 500);

  const handleTabClick = (id: number) => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (id === tab.id) {
          setCurrentTab(tab.name);
          return { ...tab, current: true };
        } else {
          return { ...tab, current: false };
        }
      }),
    );
  };

  // const handleSearchChange = (query: string) => {
  //   debounce(() => {
  //     if (currentTab === 'chats') {
  //       setSearchChatsQuery(query);
  //     } else {
  //       setSearchUsersQuery(query);
  //     }
  //   }, 500);
  // };

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
            <SearchInput changeHandler={handleSearchChange} />
          </div>
          <div className="px-4 py-4">
            {currentTab === 'chats'
              ? 'chats'
              : searchUsersData &&
                searchUsersData.map((user: User) => (
                  <div key={user.id}>
                    <p className='w-20 overflow-ellipsis whitespace-nowrap block overflow-hidden'>{user.username}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessengerSidebar;
