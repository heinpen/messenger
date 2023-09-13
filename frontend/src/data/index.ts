import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Messenger', href: '/', icon: HomeIcon, current: true },
  { name: 'People', href: '/people', icon: UsersIcon, current: false },
  { name: 'Profile', href: '/profile', icon: FolderIcon, current: false },
];
