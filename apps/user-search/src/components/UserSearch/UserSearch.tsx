import { useSyncExternalStore } from 'react';
import {
  SearchForm,
  PaginatedList,
  MultiNameMediaBlock,
} from '@demo/ui/components';
import { UsersStore } from '@demo/stores/user';
import { usersService } from '@demo/services/users';
import { User } from '@demo/domain';

const mapUserToMediaBlockProps = (user: User) => ({
  id: user.id,
  link: user.html_url,
  imageSrc: user.avatar_url,
  imageAlt: `@${user.login}`,
  name: user.login,
  secondaryName: user.name ? `${user.name}` : undefined,
  desc: user.bio,
  tags: [
    ...(user.location ? [user.location] : []),
    ...(user.email ? [[user.email, `mailto:${user.email}`] as const] : []),
  ],
});

const usersStore = new UsersStore(usersService);

export const UserSearch = () => {
  const handleChange = (page: number) =>
    usersStore.updatePagination((p) => ({ ...p, page }));

  const storeState = useSyncExternalStore(
    usersStore.subscribe,
    usersStore.getSnapshot
  );

  const users = storeState.users?.map(mapUserToMediaBlockProps);

  return (
    <>
      <SearchForm onSearch={usersStore.searchUsersByUsername} />
      {users && users.length > 0 && (
        <PaginatedList
          items={users}
          title={`${storeState.usersCount} users found`}
          pagination={{ onChange: handleChange, ...storeState.pagination }}
          renderItem={(item) => <MultiNameMediaBlock {...item} />}
        />
      )}
    </>
  );
};
