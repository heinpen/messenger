import Link from 'next/link';
import React from 'react';

type AuthLinkWrapperProps = {
  label: string;
  link: string;
  to: string;
};

const AuthLinkWrapper: React.FC<AuthLinkWrapperProps> = ({
  label,
  link,
  to,
}) => {
  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {label}{' '}
      <Link
        href={to}
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        {link}
      </Link>
    </p>
  );
};

export default AuthLinkWrapper;
