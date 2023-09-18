import { logoutUser } from '@/api/auth';
import useUser from '@/hooks/useUser';
import { classNames } from '@/utils';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, type FC } from 'react';
import useSWRMutation from 'swr/mutation';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

interface ProfileDropdownProps {}

const ProfileDropdown: FC<ProfileDropdownProps> = ({}) => {
  const router = useRouter();

  const {
    trigger,
    error: logoutError,
    data: logoutData,
  } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/logout`,
    logoutUser,
  );

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trigger();
  };

  const { data, error: userError, isLoading } = useUser();

  useEffect(() => {
    if (logoutData) router.push('/auth/login');
    if (userError) router.push('/auth/login');
  }, [userError, logoutData, router]);

  console.log(logoutError, logoutData);

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width={16}
            height={9}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {data && (
            <p className="mb-3 px-4 py-2 text-sm text-gray-950 font-semibold">
              {data.username}
            </p>
          )}
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}

          {/* Logout button */}
          <Menu.Item>
            {({ active }) => (
              <Link
                href={'/auth/login'}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                )}
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default ProfileDropdown;
