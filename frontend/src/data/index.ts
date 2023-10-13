import { FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Messenger', href: '/', icon: HomeIcon, current: true },
  { name: 'People', href: '/people', icon: UsersIcon, current: false },
  { name: 'Profile', href: '/profile', icon: FolderIcon, current: false },
];

export const sidebarTabs = [
  { id: 0, displayName: 'You chats', name: 'chats', current: true },
  { id: 1, displayName: 'Find people', name: 'people', current: false },
];
