import type { FC } from 'react';

interface TitleProps {
  content: string;
}

const Title: FC<TitleProps> = ({ content }) => {
  return (
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      {content}
    </h2>
  );
};
export default Title;
