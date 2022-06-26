import { useState } from 'react';
import {
  SearchForm,
  PaginatedList,
  MultiNameMediaBlock,
} from '@demo/ui/components';

const fakeItems = [
  {
    id: 1,
    link: '/BigAB',
    imageSrc: 'https://avatars.githubusercontent.com/u/76821?s=40&amp;v=4',
    imageAlt: '@BigAB',
    name: 'Adam L Barrett',
    secondaryName: 'BigAB',
    desc: 'JavaScript and Front-End Consultant / Developer',
    tags: ['SK, Canada', ['bigab@live.ca', 'mailto:bigab@live.ca']],
  },
  {
    id: 2,
    name: 'Jane Doe',
    imageSrc: 'https://avatars.githubusercontent.com/u/12821714?v=4',
    tags: [['dope af', 'https://dope.af']],
  },
];

export const UserSearch = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 10,
  });
  const handleChange = (page: number) => setPagination((p) => ({ ...p, page }));

  return (
    <>
      <SearchForm onSearch={(v) => console.log(v)} />
      <PaginatedList<{ id: number; name: string }>
        items={fakeItems}
        pagination={{ onChange: handleChange, ...pagination }}
        renderItem={(item) => <MultiNameMediaBlock {...item} />}
      />
    </>
  );
};
