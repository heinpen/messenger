import { classNames } from '@/utils';
import type { FC } from 'react';

interface TabsProps {
  tabs: {
    name: string;
    current: boolean;
    id: number;
  }[];
  className?: string;
  handleClick: (id: number) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, className, handleClick }) => {
  return (
    <div className="flex justify-between" aria-label="Tabs">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={classNames(
            tab.current
              ? 'bg-gray-100 text-gray-700'
              : 'text-gray-500 hover:text-gray-700',
            'px-3 py-2 font-medium text-sm rounded-md',
          )}
          aria-current={tab.current ? 'page' : undefined}
          onClick={() => handleClick(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
export default Tabs;
