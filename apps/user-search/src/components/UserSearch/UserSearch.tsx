import {
  SearchForm,
  PaginatedList,
  MultiNameMediaBlock,
} from '@demo/ui/components';
import { UsersStore } from '@demo/stores/user';
import { usersService } from '@demo/services/users';
import { User } from '@demo/domain';
import { useStore } from '@demo/react-utils';

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
  const [
    { users, usersCount, pagination, errors, status },
    { updatePagination, searchUsersByUsername },
  ] = useStore(usersStore);

  const userData = users?.map(mapUserToMediaBlockProps);

  return (
    <>
      <SearchForm onSearch={searchUsersByUsername} />
      <PaginatedList
        items={userData}
        title={`${usersCount} users found`}
        pagination={{
          onChange: (page: number) =>
            updatePagination((p: object) => ({ ...p, page })),
          ...pagination,
        }}
        renderItem={(item) => <MultiNameMediaBlock {...item} />}
        errors={errors}
        status={status}
      />
    </>
  );
};
