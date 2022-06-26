import { User } from '@demo/domain';

interface UsersService {
  getPaginatedList(
    query: { username: string },
    page: number
  ): Promise<readonly User[]>;
}

export class UsersStore {
  constructor(private readonly usersService: UsersService) {}
}
