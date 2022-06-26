import { UsersStore } from './users';
import { User } from '@demo/domain';
import { Deferred, mockUser } from '../testUtils';

describe('UsersStore', () => {
  it('should work', () => {
    const mockUserService = createMockUsersService();
    expect(new UsersStore(mockUserService)).toBeInstanceOf(UsersStore);
  });

  it('should fetch users as soon as it is subscribed to', async () => {
    const mockUserService = createMockUsersService();
    const store = new UsersStore(mockUserService);
    const callback = jest.fn();

    const unsubscribe = store.subscribe(callback);
    mockUserService.resolve({ items: [mockUser], total_count: 1001 });

    expect(mockUserService.getPaginatedList).toHaveBeenCalledTimes(1);
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
