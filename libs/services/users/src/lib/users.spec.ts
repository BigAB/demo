import * as usersService from './users';

describe('usersService', () => {
  it('should work', () => {
    expect(usersService.getPaginatedList).toBeDefined();
  });
});
