import { UsersStore } from './users';
import { User } from '@demo/domain';
import { Deferred, mockUser } from '../testUtils';

describe('UsersStore', () => {
  it('should work', () => {
    const mockUserService = createMockUsersService();
    expect(new UsersStore(mockUserService)).toBeInstanceOf(UsersStore);
  });

  it('should fetch users when search is performed', async () => {
    const mockUserService = createMockUsersService();
    const store = new UsersStore(mockUserService);
    const callback = jest.fn();

    const unsubscribe = store.subscribe(callback);

    store.searchUsersByUsername('test');

    expect(mockUserService.getPaginatedList).toHaveBeenCalledTimes(1);

    expect(callback.mock.calls[0]).toEqual([
      {
        pagination: { page: 1, totalPages: 0 },
        status: 'ready',
        users: undefined,
        usersCount: 0,
      },
    ]);

    mockUserService.resolve({ items: [mockUser], total_count: 1001 });

    expect(callback.mock.calls[1]).toEqual([
      {
        pagination: { page: 1, totalPages: 0 },
        status: 'pending',
        users: undefined,
        usersCount: 0,
      },
    ]);
    await Promise.resolve(); // wait a tick!
    expect(callback.mock.calls[2]).toEqual([
      {
        pagination: { page: 1, totalPages: 201 },
        status: 'ready',
        users: [mockUser],
        usersCount: 1001,
      },
    ]);

    unsubscribe();
  });
});

interface Response {
  items: readonly User[];
  total_count: number;
}

export const createMockUsersService = () => {
  let deferred: ReturnType<typeof Deferred<Response>>;
  const getPaginatedList = jest.fn(() => {
    deferred = Deferred<Response>();
    return deferred.promise;
  });
  const resolve = (arg: Response) => deferred?.resolve(arg);
  const reject = (arg: Response) => deferred?.reject(arg);
  return {
    getPaginatedList,
    resolve,
    reject,
  };
};
