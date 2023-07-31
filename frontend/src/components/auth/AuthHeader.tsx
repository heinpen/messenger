import Image from 'next/image';
import type { FC } from 'react';
import Title from './Title';

interface AuthHeaderProps {
  title: string;
}

const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
        width={48}
        height={48}
      />
      <Title content={title} />
    </div>
  );
};
export default AuthHeader;
