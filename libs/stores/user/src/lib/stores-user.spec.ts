import { storesUser } from './stores-user';

describe('storesUser', () => {
  it('should work', () => {
    expect(storesUser()).toEqual('stores-user');
  });
});
