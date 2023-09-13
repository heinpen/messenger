import MessengerHeader from '@/components/messenger/header/MessengerHeader';
import MessengerMain from '@/components/messenger/main/MessengerMain';
import MessengerSidebar from '@/components/messenger/sidebar/MessengerSidebar';
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

export default function Messenger() {
  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <MessengerSidebar></MessengerSidebar>

        <div className="md:pl-64 flex flex-col">
          {/* Header */}
          <MessengerHeader></MessengerHeader>

          {/* Main content */}
          <MessengerMain></MessengerMain>
        </div>
      </div>
    </>
  );
}
