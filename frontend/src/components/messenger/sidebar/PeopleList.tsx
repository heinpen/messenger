import type { FC } from 'react';

interface PeopleListProps {}

type Person = {
  username: string;
  firstName?: string;
  lastName?: string;
};

const PeopleList: FC<PeopleListProps> = ({}) => {
  const people: Person = [];

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {people.length > 0 ? (
        people.map((person) => (
          <li key={person.id} className="py-4 flex">
            {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))
      ) : (
        <p>Nobody found</p>
      )}
      {}
    </ul>
  );
};
export default PeopleList;
