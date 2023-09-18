import type { FC } from 'react';

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = ({}) => {
  return (
    <div className="mt-1">
      <input
        type="text"
        name="name"
        id="name"
        className="shadow-sm block w-full sm:text-sm px-4 rounded-full mt-3"
        placeholder="Search"
        aria-label="Full Name or Username"
      />
    </div>
  );
};
export default SearchInput;
